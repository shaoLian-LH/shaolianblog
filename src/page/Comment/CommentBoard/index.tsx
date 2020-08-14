import React, { useState, useEffect, FC } from 'react';
import Fetch from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';
import { message } from 'antd';
import Empty from '@C/Empty';
import CommentCard from '../CommentCard';
import Masonry from 'react-masonry-component';
import { useLocation } from 'react-router-dom';
import $ from 'jquery';
import './commentBoard.scss';

export interface ICardItem {
    id?: string,
    author: string,
    addTime: string,
    content: string,
    email: string
}

interface ICommentBoardProps{
    className?: string
}

const CommentBoard: FC<ICommentBoardProps> = (props) => {

    const [ commentList, setCommentList ] = useState<ICardItem[]>([]);
    const [ pn, setPn ] = useState(1);
    const [ getMore, setGetMore ] = useState(true);
    // 是否还有数据
    const [ isNull, setIsNull ] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        if( getMore && !isNull) {
            let id = "0";
            if( location.search.indexOf("id") !== -1 ){
                id = location.search.split("=")[1];
            }
            setGetMore(false);
            fetchComments(id);
        }
        if( !isNull ) {
            listener();
        }
        // eslint-disable-next-line
    },[ getMore ])

    const listener = ()=>{
        $('.comment-content-wrap-div').on("scroll",function(){
            let scrollHeight = this.scrollHeight;
            let scrollTop = $(this).scrollTop() as number;
            let clientHeight = $(this).height() as number;
            if(scrollTop + clientHeight > scrollHeight - 30) {
                if( !getMore ) {
                    setGetMore(true);
                }
            }
        });
    }

    const fetchComments = (id: string)=>{
        let url = CONSTURL.COMMENTS_OPERATION 
                + `/${id}` 
                + `?pn=${pn}`
        Fetch.get(url)
        .then((res)=>{
            let infos = res.data.infos;
            if(infos !== undefined){
                let newList = [ ...commentList, ...infos.list ];
                setCommentList(newList);
                if( !infos.hasNextPage ){
                    setIsNull(true);
                    $('.comment-content-wrap-div').off("scroll");
                } else {
                    let wrapHeight = $('.comment-content-wrap-div').height() as number;
                    let containerHeight = $('.comment-detail-content-div').height() as number;
                    if( wrapHeight > containerHeight ){
                        setPn(pn+1);
                        setGetMore(true);
                    } else {
                        setPn(pn+1);
                    }
                }
            }
        },(error)=>{
            message.error("拉取评论信息失败");
        })
    }

    const masonryOptios = {
        columnWidth: document.body.clientWidth < 1920 ? 180 : 220,
        gutter: 30,
        fitWidth: true,
        itemSelector: ".common-card-main-div"
    };

    return (
        <div className = { props.className!==undefined ? `comment-main-div ${props.className}` : "comment-main-div" }>
            <div className = "comment-content-wrap-div">
                <div className = "comment-content-main-div">
                    <Masonry className={ 'comment-detail-content-div' } elementType={'div'} options={ masonryOptios } >
                    {
                        commentList.length === 0?<Empty />:commentList.map((item: ICardItem)=>{
                            return (
                                <CommentCard 
                                    key = { item.id } 
                                    author = { item.author } 
                                    addTime = { item.addTime } 
                                    content = { item.content } 
                                    email = { item.email }
                                />
                            )
                        })
                    }
                    </Masonry>
                </div>
            </div>
        </div>
    )
}

export default CommentBoard;