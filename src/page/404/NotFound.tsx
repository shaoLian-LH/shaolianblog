import React, { FC } from 'react';
import Empty from '@C/Empty';
import { Link } from 'react-router-dom';
import './notFound.scss';
const NotFound: FC = () => {
    return (
        <div className = "notfound-main-div">
            <Empty 
                emptyTitle = '链接消失了？！' 
                content = { <p>回到<Link to = '/'>首页</Link>看看</p> }
            />
        </div>
    )
}

export default NotFound;

