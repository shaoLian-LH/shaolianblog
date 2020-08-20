import React, { FC } from 'react';
import { useInterval } from '@/hooks/useInterval';
import './typeWriterPaper.scss';
import $ from 'jquery';
/**
 * 动态答应欢迎提示语
 */
const TypeWriterPaper: FC = () => {

    let words = ["Welcome to my blog","Click the note book","Search what you want"];
    let part, i = 0, offset = 0, len = words.length, skip_count=0,skip_delay=5, speed = 80;    
    
    useInterval(function(){
        if( i < len ){
            offset++;
            if(offset >= words[i].length){
                $('#word-text').text(words[i]);
                skip_count++;
                if( skip_count === skip_delay ){
                    $('#word-text').text('');
                    let newWord = $('<p>'+words[i]+'</p>');
                    $('#word-show').append(newWord);
                    offset = 0;
                    skip_count = 0;
                    i++;
                }
            } else {
                part = words[i].substr(0, offset);
                $('#word-text').text(part);
            }   
        }
    }, speed);

    return (
        <div id="welcome-pepar-main-div">
            <div id="word"><div id="word-show"></div><p id="word-text"></p></div>
        </div>
    )
}

export default TypeWriterPaper;
