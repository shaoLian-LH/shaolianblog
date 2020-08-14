import React, { useState, useEffect, useContext } from 'react';
import NoteList from '../NoteList';
import PageNav, { IPageListItem } from '@/components/PageNav';
import TagNav from '../TagNav';
import Fetch from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';
import './commonNoteList.scss';
import { NoteArticleContext, INoteContextValues } from '@/page/Note';

// 该组件由两个子组件组成（NoteList与TagNav）
function CommonNoteList(){

    const ctx = useContext(NoteArticleContext) as unknown as INoteContextValues;
    // 通知子组件NoteList此时是否正在获取新的数据
    const [ isReLoad, setIsReLoad ] = useState(true);
    // 当前所处的路由
    const [ location, setLocation ] = useState("");
    // 父组件持有数据数组
    const [ list, setList ] = useState([]);
    // 父组件持有翻页数据数组
    const [ pageInfo, setPageInfo ] = useState<IPageListItem>();
    // 查询的页数
    const [ pn, setPn ] = useState("1");
    
    useEffect(()=>{
        if(isReLoad){
            _loadData();
            setIsReLoad(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ isReLoad, ctx.isChanged ])

    // 此方法与TagNav联动，TagNav中点击搜索按钮将会调用此方法
    // e代表下个url地址
    const reveiveChanged=(e: string)=>{
        if(e === undefined || e.length === 0){
            setPn("1");
            setLocation('');
        } else {
            if(location === ''){
                setPn("1");
            }
            setLocation(e);
        }
        setIsReLoad(true);
    }

    // 根据路由刷新数据
    const _loadData = ()=>{
        let temp;
        if(location === undefined || location.length === 0){
            temp = "?pn=" + pn;
        } else {
            temp = location + "&pn=" + pn;
        }
        let url = CONSTURL.GET_ARTICLES_BY_PARAMS + temp;
        Fetch
        .get(url)
        .then(res => {
            setList(res.data.infos.list);
            setPageInfo(res.data.infos);
        });
    }

    // 监听PageNav组件的点击
    const handleNext = (value: string) => {
        if(value === "next"){
            let temp = Number(pn) + 1;
            setPn(temp+"");   
        }else if (value === "pre"){
            let temp = Number(pn) - 1;
            if( temp <= 0 ){
                setPn("1");
            }else {
                setPn(temp.toString());
            }
        }else{
            setPn(value);
        }
        setIsReLoad(true);
    }

    // 监听TagNav组件点击清空事件
    const handleClearChoice = ()=>{
        setPn("1");
        setLocation("");
        setIsReLoad(true);
    }
    
    return(
        
        <div id="common-note-list-main-div"
            className = { ctx.isChanged?"common-note-list-disappear":"common-note-list-show" }
        >
            <TagNav 
                handlerClick = { reveiveChanged } 
                handlerClear = { handleClearChoice }
            />
            <NoteList
                list = { list } 
                isReLoad = { isReLoad }
            />
            <PageNav 
                pageList = { pageInfo as IPageListItem }
                handleClick = { handleNext }
            />
        </div>
     
    )
}
export default CommonNoteList;