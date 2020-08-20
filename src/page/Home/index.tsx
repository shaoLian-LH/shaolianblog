import React, { FC } from 'react';
import './home.scss';
import HomeFooter from './HomeFooter';
import MessageBoard from './MessageBoard';
import NoteBook from './NoteBook';
import PadCarousel from './PadCarousel';
import PostCardBox from './PostCardBox';
import TypeWriterPaper from './TypeWriterPaper';
/**
 * 博客首页
 */
const Home: FC = ()=>{

    return (
        <div id = "home-main-div">
            <PadCarousel />
            <MessageBoard />
            <TypeWriterPaper />
            <NoteBook />
            <PostCardBox />
            <HomeFooter />
        </div>
    )
}

export default Home;