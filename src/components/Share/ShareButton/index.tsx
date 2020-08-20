import React, { FC } from 'react';
import { QqOutlined } from '@ant-design/icons';
import './shareButton.scss';

interface IShareButtonProps {
    className?: string,
    onClick: Function,
    icon: any
}

const ShareButton: FC<IShareButtonProps> = (props) => {

    return (
        <div 
            id="share-button-item" 
            className = { props.className !== undefined ? props.className :'' } 
            onClick = { () => { props.onClick() } } 
        >
            { props.icon !== undefined ? props.icon : <QqOutlined /> }
        </div>
    )
}

export default ShareButton;