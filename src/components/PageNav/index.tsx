import React, { useState,useEffect, FC, SetStateAction, Dispatch  } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './pageNav.scss'

export interface IPageListItem {
    list: never[],
    pages: number,
    isFirstPage: boolean,
    pageNum: number,
    isLastPage: boolean
}

interface IPageNavProps {
    pageList: IPageListItem,
    handleClick: Function
}

// 页表组件，需要传入pageList与handleClick
const PageNav: FC<IPageNavProps> = (props) => {

    const [ pageList, setPageList ] = useState<IPageListItem>() as unknown as [IPageListItem, Dispatch<SetStateAction<IPageListItem>>];
    
    useEffect(()=>{
        setPageList(props.pageList);
        // eslint-disable-next-line
    }, [ props ]);

    const getList = () =>{
        let liArr: any[] = [];
        // 查空
        if( pageList?.list === undefined || pageList?.list === null || pageList?.list.length === 0 ){
            return liArr;
        }

        let length = pageList.pages-0;
        let isFirstPage = pageList.isFirstPage;
        let isLastPage = pageList.isLastPage;
        let pageNum = pageList.pageNum;
        if(!isFirstPage){
            let newLi = (<li key={"slPre"} className = "textLi" onClick = { ()=>{ props.handleClick("pre") } }><LeftOutlined /></li>);
            liArr.push(newLi);
        }
        for( let i = 0 ; i < length ; i++ ){
            if(i < 3 && i !== (length-1)){
                let newLi = (
                    <li key={ (i+1) } 
                        className = { pageNum===(i+1)?'currentLi disabled':'commonLi' } 
                        onClick = { ()=>{ props.handleClick((i+1)) } }
                    >{(i+1)}</li>
                );
                liArr.push(newLi);
            }
            if( i === 3 ){
                let newLi = (<li key={ (i+1) } className = "disabled">...</li>);
                liArr.push(newLi);
            }
            if( i === (length -1)){
                let newLi = (
                    <li key={ (i+1) } 
                        className = { pageNum===(i+1)?'currentLi disabled':'commonLi' }  
                        onClick = { ()=>{ props.handleClick((i+1)) } }
                    >{(i+1)}</li>
                );
                liArr.push(newLi);
            }
        }
        if(!isLastPage){
            let newLi = (
                <li key={"slNext"} 
                    className = "textLi" 
                    onClick = { ()=>{ props.handleClick("next") } }
                ><RightOutlined /></li>
            );
            liArr.push(newLi);
        }
        return liArr;
    }

    return (
        <div className="pageDiv">
            <ul className = "pageUl">    
                {
                    getList()
                }
            </ul>
        </div>
    );
}

export default PageNav;