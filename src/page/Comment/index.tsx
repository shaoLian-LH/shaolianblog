import React, { Fragment, FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './comment.scss';
import CommentBoard from './CommentBoard';
import AddComment from './AddComment';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Comment: FC<any> = ()=>{
    const { trackPageView } = useMatomo()
    useEffect(() => {
        trackPageView({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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