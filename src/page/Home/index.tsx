import React, { FC, useEffect } from 'react';
import './home.scss';
import HomeFooter from './HomeFooter';
import MessageBoard from './MessageBoard';
import NoteBook from './NoteBook';
import PadCarousel from './PadCarousel';
import PostCardBox from './PostCardBox';
import TypeWriterPaper from './TypeWriterPaper';
import { useMatomo } from '@datapunt/matomo-tracker-react'
/**
 * 博客首页
 */
const Home: FC = ()=>{
    const { trackPageView } = useMatomo()
    useEffect(() => {
        trackPageView({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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