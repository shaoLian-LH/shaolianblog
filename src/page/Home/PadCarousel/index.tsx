import React, { useState, useEffect, FC } from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import './padCarousel.scss';
import Request from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';

interface ICarouselItem {
    articleId: string,
    imgName: string,
    title: string
}

// pad滚动列表
const PadCarousel: FC = () => {

    const [ isInitial, setIsInitial ] = useState(false);
    const [ bannerList, setBannerList ] = useState([]);

    useEffect(()=>{
        if(isInitial === false){
            setIsInitial(true); 
            loadBannerInfos();
        }
        // eslint-disable-next-line
    },[ isInitial ])

    const loadBannerInfos = ()=>{
        Request.get(CONSTURL.GET_ALL_BANNERS)
        .then((res)=>{
            const Res = res as unknown as any;
            setBannerList(Res.banners.a);
        });
    }


    const getCarouselChilds = ()=>{
        return bannerList ? bannerList.map((item: ICarouselItem)=>{
            return (
                <Link
                    key = { item.articleId } 
                    to = { `/note?detail&id=${item.articleId}`} 
                >
                    <div className="carousel-banner-div" >
                        <img className="carousel-banner-img" src={  item.imgName!==undefined?CONSTURL.SOURCE_PRE+item.imgName:'../../image/cat.png' } alt = { "图没了" } />
                        <p className="carousel-banner-p">{ item.title }</p>                                
                    </div>
                </Link>
            )
       }): (
            <Link
                key = 'nullLink'
                to = '/'
            ></Link>
       )
    }
    return (
        <div id = "carousel-main-div">
            <Carousel
                effect = "scrollx" 
                autoplay = { true } 
            >
                {
                    getCarouselChilds()
                }
            </Carousel>
        </div>
    )
}

export default PadCarousel;