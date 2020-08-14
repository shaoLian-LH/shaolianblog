import React,{ useState, useEffect, FC } from 'react';
import Fetch from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';
import { RightOutlined, ProfileOutlined } from '@ant-design/icons';
import './home_ArticleList.scss';
import { Link } from 'react-router-dom';

interface IArticleSimpleItem {
    id: string,
    tagName: string,
    title: string
}

const ArticleList: FC = () => {

    const [ isInitial, setIsinitial ] = useState(false);
    const [ articleList, setArticleList ] = useState([]);

    useEffect(()=>{
        if( !isInitial ){
            setIsinitial(true);
            fetchData();
        }
        // eslint-disable-next-line
    },[ articleList ])

    const fetchData = ()=>{
        Fetch.get(CONSTURL.GET_ARTICLES_BY_PARAMS)
        .then((res)=>{
            let list  =  (res.data.infos.list === undefined ? []: res.data.infos.list);
            if(list.length > 5){
                list = list.slice(0, 5);
            }
            setArticleList(list);
        })
    }


    return (
        <div id = "home-forPhone-article-list-main-div">
            <div className = "home-forPhone-article-list-title-div">
                <p className = "home-forPhone-article-list-title"><ProfileOutlined className = "home-list-title-icon"/>最新文章</p>
                <p className = "home-forPhone-article-list-title-arrow"><RightOutlined /></p>
            </div>
            <div className = "home-forPhone-article-list-div">
                {
                    articleList.length !== 0
                    ? articleList.map((item: IArticleSimpleItem)=>{
                        return (
                            <Link 
                                className = "home-forPhone-article-list-li" 
                                key = { "home-list-li-" + item.id } 
                                to = { "/blog/note?detail&id="+item.id }> 
                                <p className = "home-forPhone-article-list-li-tag">{ item.tagName }</p>
                                <p className = "home-forPhone-article-list-li-title">{ item.title.replace("# ", "") }</p>
                            </Link>
                        )
                    })
                    : ''
                }
            </div>
        </div>
    )
}

export default ArticleList;