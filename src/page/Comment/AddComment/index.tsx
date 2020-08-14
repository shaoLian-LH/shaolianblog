import React, { useState, useEffect, Fragment, FC } from 'react';
import { SketchOutlined, CloseOutlined } from '@ant-design/icons';
import { Input, Button, message } from 'antd';
import { CSSTransition } from 'react-transition-group';
import './addComment.scss';
import $ from 'jquery';
import Fetch from '@/config/Fetch';
import CONSTURL from '@/config/Consturl';
const { TextArea } = Input;

interface IAddCommentProps {
    className?: string,
    preId?: string,
    articleId?: string
}

interface ICommentDataProps {
    id: string,
    content: string,
    author: string,
    email: string,
    verified: string | number,
    preId: string | number,
    originId: string | number,
    reply: string,
    addTime: string,
    articleId: string | number
}

const AddComment: FC<IAddCommentProps> = (props) => {

    const [ isWantedCommentNow, changeIsWantedCommentNow ] = useState(false);
    const [ nickName, setNickName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ commentContent, setCommentContent ] = useState('');
    const [ isPosting, changeIsPosting ] = useState(false);

    useEffect(()=>{

    },[ isWantedCommentNow, isPosting ])

    const isValid = ()=>{
        if( nickName.replace(/s+/g, "").length === 0 ){
            message.info('~请填写一个匿名昵称~');
            $('#author').focus();
            return false;
        } else if ( email.replace(/s+/g, "").length !== 0 ){
            let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            let result = reg.test(email.replace(/s+/g, ""));
            if( !result ){
                message.info('~请检查邮箱格式~');
                $('#email').focus();
                return false;
            }
        } 
        if ( commentContent.replace(/s+/g, "").length === 0 ){
            message.info('~请填写评论~');
            $('#commentTA').focus();
            return false;
        }
        return true;
    }

    const postData = ()=>{
        let result = isValid();
        if(result){
            let dataProps: ICommentDataProps = {
                id : "",
                content : commentContent,
                author : nickName,
                email: email,
                verified :"0",
                preId: props.preId !== undefined ? props.preId : "0",
                originId: "",
                reply: "",
                addTime: "",
                articleId: props.articleId !== undefined ? props.articleId : ""
            }
            Fetch.post(CONSTURL.COMMENT_OPERATION, dataProps)
            .then(()=>{
                message.success('感谢您的留言，在审核后将会展示~', 3);
                setCommentContent('');
                setNickName('');
                setEmail('');
                changeIsWantedCommentNow(false);
            },()=>{
                message.info('服务器出错了o(╥﹏╥)o，暂时无法留言');
            })
            changeIsPosting(false);
        } else {
            changeIsPosting(false);
        }
        
    }

    const Modal = (
        <div className = { props.className !== undefined ? `add-comment-modal-backgroud-div ${props.className}`: "add-comment-modal-backgroud-div" }>
            <div id = "add-comment-modal-main-div">
                <div className = "add-comment-modal-title">
                    New Comment （<SketchOutlined />-150）
                    <CloseOutlined className = "close-modal-btn" onClick = { ()=>{ if(isWantedCommentNow){ changeIsWantedCommentNow(false) } } } />
                </div>
                <div className = "add-comment-modal-form">
                    <div className = "add-commnet-modal-line-div">
                        <label className = "add-comment-modal-hint" htmlFor = "author">
                            昵称：
                        </label>
                        <Input 
                            id = "author" 
                            className = "modal-input" 
                            placeholder = "~取一个匿名昵称~" 
                            value = { nickName } 
                            onChange = { (e) => { setNickName(e.target.value) } } 
                            maxLength = { 20 }
                        /><br />
                    </div>
                    <div className = "add-commnet-modal-line-div">
                        <label  className = "add-comment-modal-hint" htmlFor = "email">
                            邮箱：
                        </label>
                        <Input 
                            id = "email" 
                            className = "modal-input" 
                            placeholder = "~邮箱，可以不填~" 
                            value = { email } 
                            onChange = { (e) => { setEmail(e.target.value.replace(/\s+/g, "")) } }
                        /><br />
                    </div>
                    <div className = "add-commnet-modal-line-div">
                        <label  className = "add-comment-modal-hint" htmlFor = "commentTA">
                            评论内容：
                        </label>
                        <TextArea 
                            id = "commentTA" 
                            className = "modal-input" 
                            rows = { 9 } 
                            placeholder = "~评论内容，最长支持200字~" 
                            value = { commentContent } 
                            onChange = { (e)=>{ setCommentContent(e.target.value) } } 
                            maxLength = { 200 } 
                        />
                    </div>
                    <div className = "add-commnet-modal-line-div">
                        <Button 
                            className = "modal-btn" 
                            onClick = { ()=>{ changeIsPosting(true); postData(); } } 
                            loading = { isPosting }
                        >
                            留&nbsp;&nbsp;言
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Fragment >
            <CSSTransition
                in =  { isWantedCommentNow } 
                timeout = { 1000 } 
                classNames = 'modal-anime' 
                unmountOnExit
            >{ Modal }</CSSTransition>
            <div id = "add-comment-main-div" className = { props.className? props.className: "" }>
                <div className = "add-comment-paper"></div>
                <CSSTransition 
                    in = { !isWantedCommentNow } 
                    timeout = { 1000 }
                    classNames = 'paper-anime' 
                    unmountOnExit 
                ><div 
                    className = "add-comment-paper-before"
                    onClick = { ()=>{ if(!isWantedCommentNow){ changeIsWantedCommentNow(true) } } }
                >
                        New <br /> Comment
                </div>
            </CSSTransition>
            </div>
        </Fragment>
    )
}

export default AddComment;