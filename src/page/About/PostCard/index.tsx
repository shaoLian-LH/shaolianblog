import React, { useState, useEffect, FC } from 'react';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { LinkOutlined, HomeOutlined } from '@ant-design/icons';
import './postcard.scss';
import Fetch from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';

interface ILinkList {
    link: string,
    id: string,
    desc: string,
    imgName: string
}

interface ILinkItem {
    linkName: string,
    linkList: Array<ILinkList>
}

const Postcard: FC = () => {

    const [ friendLinkList, setFriendLinkList ] = useState([]);
    
    useEffect(()=>{
        fetchFriendLink();
    },[ ])

    const fetchFriendLink = ()=>{
        Fetch.get(CONSTURL.FRIEND_LINK_INFOS)
        .then((res)=>{
            setFriendLinkList(res.data.list);
        },()=>{
            message.error("获取友链信息失败");
        })
    }

    return (
        <div className = "about-component-postcard-main-div">
            <div className = "about-postcard-title-div">
                <p className = "about-postcard-title">关于本博客</p>
                <Link 
                    to = "/" 
                    title = "返回首页" 
                    className = "about-postcard-icon"
                > <HomeOutlined />
                </Link>
            </div>
            <div className = "author-intro-div">
                <img 
                    className = "author-img" 
                    src = "img/article/8f072d3ff68f48b8b270930d6908a421.jpg" 
                    alt="这池子不行的.jpg"
                />
                <p className = "author-name">邵莲</p>
                <p className = "author-intro">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;曾经是舰狗。一名软件工程专业前端方向的学生。这个网站以记录本人日常学习经验、踩过的坑和放作业为主。</p>
            </div>
            <div className = 'friend-main-div'>
                {
                    friendLinkList.length === 0
                    ? ''
                    : friendLinkList.map((linkO: ILinkItem, index: number)=>{
                        let o = linkO;
                        let contentWrap = (
                            <ul 
                                key = { `friend-box-ul-${index}` } 
                                className = 'friend-box-ul'
                            >
                                <p 
                                    key={ `friend-box-title-${index}` } 
                                    className = 'friend-box-title'
                                >{ o.linkName }</p>
                                {
                                    o.linkList.map((templinkO, tIndex)=>{
                                        return <a 
                                            className = "friend-link" 
                                            key = { `friend-link-${tIndex}` } 
                                            href = { templinkO.link } 
                                            target = "_blank" 
                                            rel = "noopener noreferrer"
                                        >
                                            {
                                                (templinkO.imgName !== undefined && templinkO.imgName !== "")
                                                ? <div key = {`friend-link-div-${templinkO.id}`}>
                                                    <img 
                                                        key = {`friend-link-img-${templinkO.id}`} 
                                                        className = "friend-img" 
                                                        src = { CONSTURL.SOURCE_PRE + templinkO.imgName} 
                                                        alt = { templinkO.imgName } 
                                                    />
                                                    <p 
                                                        key = { `friend-img-title-${templinkO.id}` } 
                                                        className = "friend-img-title-p"
                                                    >{ templinkO.desc }</p>
                                                </div>
                                                : <div key = {`friend-link-div-${templinkO.id}`}>
                                                    <LinkOutlined /> { templinkO.desc }
                                                </div>
                                            }
                                        </a>;
                                    })
                                }
                            </ul>
                        );
                        return contentWrap;
                    })
                }
            </div>
        </div>
    )
}

export default Postcard;