import React,{ useState , Fragment, useEffect, useContext, FC, useRef} from 'react';
import { Row, Col } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '@C/Tocify';
import CONSTURL from '@/config/Consturl';
import Fetch from '@/config/Fetch';
import { NoteArticleContext, INoteContextValues } from '@/page/Note';
import Share from '@C/Share';
import './detailNote.scss';
import $ from 'jquery';

// 详细笔记页面
const DetailNote: FC =() => {
    const ctx = useContext(NoteArticleContext) as unknown as INoteContextValues;

    // 判断当前页面是否为初次渲染
    const [ articleId, setArticleId ] = useState<string>('');
    const [ articleTitle, setArticleTitle ] = useState<string>('');
    const [ articleDesc, setArticleDesc ] = useState<string>('');

    // 将标题和内容的markdown标签进行解析与渲染
    const [ htmlTitle, setHtmltitle ] = useState<any>("");
    const [ htmlContext, setHtmlContext ] = useState<any>("");
    
    // 导航插件
    const tocify = new Tocify();
    const tocifyRef = useRef<Tocify>();
    const renderer = new marked.Renderer();
    // 记录锚点数组
    const anchorGroup = useRef<string[]>([]);
    // 最近到达的锚点
    const currentChoiceAnchor = useRef<string>('');
    // 辅助查询页面向下还是向上
    const scrollDelta = useRef<number>(0);

    renderer.heading = function (text, level, raw){
        tocify.setContainer('detail-note-main-div');
        const anchor = tocify.add(text, level);
        tocifyRef.current = tocify;
        // 防止同个锚点被多次加入
        if(anchorGroup.current.indexOf(anchor) === -1){
            anchorGroup.current.push(anchor);
        }
        // 初始应该被选择的锚点
        if(currentChoiceAnchor.current === '') {
            currentChoiceAnchor.current = anchor;
        }
        return `<p id="${ anchor }" class="anchor-fix"><h${level}>${ text }</h${level}></p>\n`;
    }
    marked.setOptions({
        renderer: renderer,
        //渲染
        gfm: true,
        //是否启动严格markdown模式
        pedantic: false,
        //是否支持Html的标签
        sanitize: false,
        //换行符的样式，需要gfm
        breaks: false,
        //列表样式渲染，默认是false
        smartLists: true,
        highlight: function(code){
            return hljs.highlightAuto(code).value;
        }
    });

    useEffect(()=>{
        if( ctx.articleId.length !== 0 ){
            loadArticle();
            setArticleId((id)=>{
                if(id !== ctx.articleId) {
                    return ctx.articleId
                } else {
                    return id;
                }
            });
            if(!ctx.isChanged){
                ctx.setIsChanged(true);
            }
        }
        return (()=>{
            $('.detail-note-show').off('scroll', onDivScorll);
        })
        // eslint-disable-next-line
    },[ ctx.articleId ])

    // 监听滚动
    const onDivScorll = () => {
        let father = document.querySelector('#detail-note-main-div') as HTMLElement;
        let index = anchorGroup.current.indexOf(currentChoiceAnchor.current);
        if(scrollDelta.current - father.scrollTop < 0){
            // 向后查询
            let nextItem = anchorGroup.current[ index + 1 ];
            let target = document.getElementById(`${nextItem}`);
            scrollDelta.current = father.scrollTop;
            if(target && father.scrollTop - target.offsetTop > 20) {
                if(nextItem) {
                    currentChoiceAnchor.current = nextItem;
                    tocify.changeChoiceItem(nextItem);
                }
            }
        } else {
            // 向前查询
            let preItem = anchorGroup.current[ index - 1 ];
            let target = document.getElementById(`${preItem}`);
            scrollDelta.current = father.scrollTop;
            if(target && father.scrollTop - target.offsetTop < 20) {
                if(preItem) {
                    currentChoiceAnchor.current = preItem;
                    tocify.changeChoiceItem(preItem);
                }
            }
        }
        
    }

    // 获取博客数据
    const loadArticle = ()=>{
        Fetch.get(CONSTURL.GET_ARTICLE_BY_ID + ctx.articleId)
        .then((res)=>{
            let data = res.data.data;
            anchorGroup.current = [];
            currentChoiceAnchor.current = '';
            setArticleTitle(data.title);
            setArticleDesc(data.introduce);
            setHtmltitle(data.title);
            setHtmlContext(data.content);
            $('.detail-note-show').on('scroll', onDivScorll);
        })
    }
    
    const getDetailNote =()=>{
        return (
            <Row
                justify = "center"
            >
                <Col xs={ 24 }  sm={ 24 }  md={ 16 } lg={ 16 } xl={ 16 }  xxl={ 18 }>
                    <div id='detail-note-main-div' className = { !ctx.isChanged?'detail-note-disappear':'detail-note-show' }>
                        <div className = 'detail-note-title'
                            dangerouslySetInnerHTML = {{ __html : marked(htmlTitle) }}
                        >
                        </div>
                        <div 
                            className='detail-note-body' 
                            dangerouslySetInnerHTML = {{ __html : marked(htmlContext) }}
                        >
                        </div>
                    </div>
                </Col>
                <Col xs={ 0 }  sm={ 0 }  md={ 8 } lg={ 8 } xl={ 8 }  xxl={ 6 }>
                    <div id="detailed-nav">
                        <div className="nav-tiitle">笔记导航</div>
                        { tocify && tocify.render() }
                    </div>
                    <Share 
                        id = { articleId } 
                        title = { articleTitle.slice(2).slice(0,-1) } 
                        desc = { articleDesc.slice(5).slice(0,-1) } 
                    />
                </Col>
            </Row>
        );
    }

    return (
        <Fragment>
            {
                articleId.length === 0
                ? ''
                : getDetailNote()
            }
        </Fragment>
    )
}

export default DetailNote;