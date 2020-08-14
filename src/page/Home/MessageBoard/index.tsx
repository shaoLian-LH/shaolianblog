import React, { useEffect, FC } from 'react';
import './messageboard.scss';
import { SketchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import $ from 'jquery';
const MessageBoard: FC = () => {

    useEffect(()=>{
        renderSpan();
    })

    const renderSpan = () => {
        for(let i = 0; i < 10; i++) {
            let newSpan = $('<span></span>');
            newSpan.addClass("notepaper");
            $('#notepaper-main-div').append(newSpan);
        }
    }

    return(
        <Link 
            className = "notepaper-link" 
            key="toComment" 
            to = "/comment"
        >
            <div id="notepaper-main-div">
                <div className = "notepaper-hint">留言板 <SketchOutlined />-1500</div>
            </div>
        </Link>
    )
}

export default MessageBoard;