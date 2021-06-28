import React, { useEffect, useState, useContext, FC } from 'react';
import { Link  } from 'react-router-dom';
import { CalendarOutlined, LoadingOutlined } from '@ant-design/icons';
import marked from 'marked';
import hljs from 'highlight.js';
import Empty from '@C/Empty';
import 'highlight.js/styles/monokai-sublime.css';
import './noteList.scss';
import { NoteArticleContext, INoteContextValues } from '@/page/Note';
 
interface INoteListItemProps {
    id: string,
    tagName: string,
    title: string,
    introduce: string,
    addTime: string
}


interface INoteListProps {
    isReLoad: boolean,
    list: INoteListItemProps[]
}  


// 笔记列表
const NoteList: FC<INoteListProps> = (props) => {
    const ctx = useContext(NoteArticleContext) as unknown as INoteContextValues;
    const [ list, setList ] = useState<INoteListItemProps[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const renderer = new marked.Renderer();
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
        setList(props.list);
        setIsLoading(props.isReLoad);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ props ])

    const handleClick = (id: string) => {
        ctx.setArticleId(id); 
        if( !ctx.isChanged ){ 
            ctx.setIsChanged(true);   
        } 
    }

    return (
        <div id="note-list-main-div">
         {   isLoading 
             ? (<div className="loading-div"><LoadingOutlined /></div>)
             : ( list.length === 0
                ? <Empty />
                : list.map((item) => {
                    return (
                        <Link
                            key = { item.id }
                            to = { "/note?detail&id="+item.id } 
                            onClick = { ()=>{ handleClick(item.id) } }
                            > 
                            <div className = "note-body" >
                                <div className="note-title-div">
                                    <p className = "note-tag">{ item.tagName }</p>
                                    <p className = "note-title"
                                        dangerouslySetInnerHTML = {{ __html: marked(item.title) }}
                                    ></p>
                                </div>
                                <div className="note-introduce-div">
                                    <div className="note-cell">
                                        <p 
                                            className="note-introduce"
                                            dangerouslySetInnerHTML = {{ __html: marked(item.introduce) }}
                                        ></p>
                                    </div>
                                </div> 
                                <div className = "note-icon-div">
                                    <CalendarOutlined />&nbsp;&nbsp;{ item.addTime }&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </Link>
                    );
                })) 
            }
        </div>
    )
}

export default NoteList;