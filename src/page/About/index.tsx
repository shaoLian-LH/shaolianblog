import React, { FC, useEffect } from 'react';
import PostCardBox from '@/page/Home/PostCardBox';
import PostCard from './PostCard';
import './about.scss';
import { useMatomo } from '@datapunt/matomo-tracker-react'
const About: FC = () => {
    const { trackPageView } = useMatomo()
    useEffect(() => {
        trackPageView({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id = "about-main-div">
            <PostCardBox className = "about-post-card"/>
            <PostCard />
        </div>
    )
}
export default About;