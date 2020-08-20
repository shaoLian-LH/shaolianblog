import React, { useEffect, useContext, FC } from 'react';
import LeftBottonItem from './LeftBottonItem';
import './leftBottomMenu.scss';
import { FileSearchOutlined, CommentOutlined } from '@ant-design/icons';
import { NoteArticleContext, INoteContextValues } from '@/page/Note';

const LeftBottonMenu: FC = () => {
    const ctx = useContext(NoteArticleContext) as unknown as INoteContextValues;
    useEffect(()=>{
        
    },[ ctx ])
    return (
        <div id = "left-botton-menu-main-div">
            <LeftBottonItem />
            <LeftBottonItem 
                target = { ctx.articleId !== '' ? `/note?detail&id=${ ctx.articleId }` :"/note" } 
                title = { "笔记列表" } 
                icon = { <FileSearchOutlined /> } 
                onClick = { ()=>{ if( ctx.wantComment ){ ctx.setWantComment(false) } } }
            />
            <LeftBottonItem 
                target = { ctx.articleId !== '' ? `/note/comment?id=${ ctx.articleId }`:"/note/comment" } 
                title = { "评论" } 
                icon = { <CommentOutlined /> } 
                onClick = { ()=>{ if( !ctx.wantComment ){ ctx.setWantComment(true) } } }
            />
        </div>
    )
}

export default LeftBottonMenu;