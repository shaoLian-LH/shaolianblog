import React, { FC, useEffect, useState, Fragment } from 'react';
import './home.scss';
import HomeFooter from './HomeFooter';
import MessageBoard from './MessageBoard';
import NoteBook from './NoteBook';
import PadCarousel from './PadCarousel';
import PostCardBox from './PostCardBox';
import TypeWriterPaper from './TypeWriterPaper';
import ArticleList from './ArticleList';
import { isPC } from '@U/pcOrPhoneUtil';
const Home: FC = ()=>{
    
    const [ pcNow, changePCNow ] = useState(isPC());

    useEffect(()=>{
        window.addEventListener('resize', mayChangeDevice);
        return (()=>{
            window.removeEventListener('resize', mayChangeDevice);
        })
    })

    const mayChangeDevice = () => {
        if(isPC() !== pcNow) {
            changePCNow(isPC());
        }
    }

    return (
        <div id = "home-main-div">
            {
                pcNow
                ? <Fragment>
                    <PadCarousel />
                    <MessageBoard />
                    <TypeWriterPaper />
                    <NoteBook />
                    <PostCardBox />
                </Fragment>
                : <Fragment>
                    <PadCarousel />
                    <ArticleList />
                </Fragment>
            }
            <HomeFooter />
        </div>
    )
}

export default Home;