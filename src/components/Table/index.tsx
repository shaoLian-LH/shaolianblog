import React, { useEffect, useState, FC } from 'react';
import './table.scss';
import $ from 'jquery';
/**
 * 桌面组件
 */
const Table: FC<any> = () => {

    const [ isInitial, setIsInitial ] = useState(false);

    useEffect(()=>{
        if( !isInitial ){
            setIsInitial(true);
            getUl();
        }
        window.addEventListener('resize',getUl);
        return (()=>{
            window.removeEventListener('resize',getUl);
        })
        // eslint-disable-next-line
    },[ isInitial ])

    const getUl=()=>{
        let curWidth = document.documentElement.clientWidth;
        let num = (curWidth - 100) / 40;
        $('.table-ul').empty();
        for ( let i = 0; i < num; i++ ){
            let newLi = $("<li>");
            newLi.addClass('table-li');
            $('.table-ul').append(newLi);
        }
    }

    return (
        <div id = "table-main-div">
            <ul className="table-ul"></ul>
        </div>
    )

}

export default Table;