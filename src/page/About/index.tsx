import React, { FC } from 'react';
import PostCardBox from '@/page/Home/PostCardBox';
import PostCard from './PostCard';
import './about.scss';
const About: FC = () => {
    return (
        <div id = "about-main-div">
            <PostCardBox className = "about-post-card"/>
            <PostCard />
        </div>
    )
}
export default About;