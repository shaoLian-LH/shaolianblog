import React, { Fragment, createContext, useState, useEffect, FC, Dispatch } from 'react';
import MyTitle from '@C/CustomerTitle';
import './note.scss';
import CommonNoteList from './noteList/CommonNoteList';
import DetailNote from './noteList/DetailNote';
import CommentBoard from '@/page/Comment/CommentBoard';
import AddComment from '@/page/Comment/AddComment';
import { Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';  
import LeftBottomMenu from '@C/LeftBottonMenu';

export interface INoteContextValues {
    articleId: string,
    setArticleId: Dispatch<React.SetStateAction<string>>,
    isChanged: boolean,
    setIsChanged: Dispatch<React.SetStateAction<boolean>>,
    wantComment: boolean,
    setWantComment: Dispatch<React.SetStateAction<boolean>>
}

export const NoteArticleContext = createContext<INoteContextValues | null>(null);
const Note: FC = () => {

    const [ articleId, setArticleId ] = useState('');
    const [ isChanged, setIsChanged ] = useState(false);
    const [ wantComment, setWantComment ] = useState(false);
    const location = useLocation();
    useEffect(()=>{
        if( location.search.indexOf("detail") !== -1 ){   
            let id = location.search.split("&")[1].split("=")[1]
            setArticleId(id);
        }
        // eslint-disable-next-line
    },[ articleId ])

    return (
        <Fragment>
            <MyTitle title="邵莲的笔记" />
            <NoteArticleContext.Provider 
                value = {{
                    articleId: articleId,
                    setArticleId: setArticleId,
                    isChanged: isChanged,
                    setIsChanged: setIsChanged,
                    wantComment: wantComment,
                    setWantComment: setWantComment,
                }}
            >
                <div id = "note-main-div">
                    <Row 
                        justify = "center"
                    >
                        <Col style = {{ "position":"absolute" }} xs={ 0 }  sm={ 0 }  md={ 24 } lg={ 24 } xl={ 24 }  xxl={ 24 }>
                            <AddComment className = { "note-page-addComment-component" } articleId = { articleId }/>
                        </Col>
                        <Col xs={ 0 }  sm={ 0 }  md={ 0 } lg={ 2 } xl={ 2 }  xxl={ 2 }>
                            <LeftBottomMenu />
                        </Col>
                        {
                            ! wantComment 
                            ?   <Fragment >
                                    <Col xs={ 0 }  sm={ 0 }  md={ 0 } lg={ 6 } xl={ 6 }  xxl={ 6 }>
                                        <CommonNoteList />
                                    </Col>
                                    <Col xs={ 24 }  sm={ 24 }  md={ 24 } lg={ 16 } xl={ 16 }  xxl={ 16 }>
                                        <DetailNote />
                                    </Col>
                                </Fragment>
                            :   <Col xs={ 22 }  sm={ 22 }  md={ 22 } lg={ 22 } xl={ 22 }  xxl={ 22 }>
                                    <CommentBoard className = "note-comment-board"/>
                                </Col>
                        }
                    </Row>
                </div>
            </NoteArticleContext.Provider>
        </Fragment>
    );
}

export default Note;