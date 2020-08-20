import React, { FC } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';  
import './leftBottonItem.scss';

interface ILeftBottonItemProps {
    title?: string,
    target?: string,
    onClick?: Function,
    icon?: any
}

const LeftBottonItem: FC<ILeftBottonItemProps> = (props) => {
    return (
        <Link 
            title = { props.title === undefined ? "首页": props.title } 
            key = { props.target === undefined ? "link-to-index": `link-to-${ props.target }` } 
            to = { props.target === undefined ? "/" : props.target } 
            className = "left-btn-wrap" 
            onClick = { ()=>{ if(props.onClick !== undefined){ props.onClick() }  } }
        >
            <div className = "left-btn-item">
                <p>{ props.icon === undefined ? <HomeOutlined /> : props.icon }</p>
            </div>
        </Link>
    )
}

export default LeftBottonItem;