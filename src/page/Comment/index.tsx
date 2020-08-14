import React, { Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import './comment.scss';
import CommentBoard from './CommentBoard';
import AddComment from './AddComment';

const Comment: FC<any> = ()=>{
    
    return (
        <Fragment>
            <Link 
                title = "返回首页" 
                key = "comment-back-home" 
                className = "comment-back-home-arrow-div" 
                to="/"
            >
                <span className = "comment-back-home-arrow"></span>
            </Link>
            <CommentBoard />
            <AddComment className = "comment-page-component" />
        </Fragment>
    )
}

export default Comment;