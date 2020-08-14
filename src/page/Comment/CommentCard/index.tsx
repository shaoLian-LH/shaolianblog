import React, { FC } from 'react';
import './commentCard.scss';
import { ICardItem } from '../CommentBoard';
const CommentCard: FC<ICardItem> = (props) => {

    const isValid = (item: string)=>{
        if( item && item !== ""){
            return item;
        } else {
            return "";
        }
    }

    return (
        <div className="common-card-main-div">        
            <h2>{ isValid(props.author) }</h2>
            <p className = "common-card-email">{ isValid(props.email) }</p>
            <p className = "common-card-content">{ isValid(props.content) }</p>
            <p className = "common-card-time">{ isValid(props.addTime) }</p>
        </div>
    )

}

export default CommentCard;