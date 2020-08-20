import React, { FC } from 'react';
import ShareButton from './ShareButton';
import './share.scss';
import { QqOutlined } from '@ant-design/icons';
const buttonCustom = [
    { "icon": <QqOutlined /> }
]

interface IShareProsp {
    id: string,
    desc: string,
    title: string
}

const Share: FC<IShareProsp> = (props) => {
    const shareTo = ()=>{
        if(props.id !== undefined){
            let href = `https://shaolianblog.top/#/blog/note?detail&id=${props.id}`;
            let url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(href)}&source=https://shaolianblog.top&title=${props.title}&summary=${props.desc}&desc=${props.desc}&pics=https://yuudachi.cn:444/static/images/article/8f072d3ff68f48b8b270930d6908a421.jpg`;
            window.open(url);
        }
    }
    return (
        <div id = "share-menu-main-div">
            <p className = "share-menu-main-title">文章分享</p>
            <div className = "share-menu-body">
                {
                    buttonCustom.map((item, index)=>{
                        return (
                            <ShareButton 
                                key = { `share-manu-item-${index}` } 
                                icon = { item.icon } 
                                onClick = { ()=>{ shareTo() } }
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Share;