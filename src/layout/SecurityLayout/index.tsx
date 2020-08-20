import React, { Component, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import Empty from '@C/Empty';

interface ISecurityLayoutState {
    hasError: boolean,
    msg: ErrorInfo | string
}
/**
 * 错误边界组件，如果发生错误则抛出错误页面（尚未完成）
 */
class SecurityLayout extends Component<any, ISecurityLayoutState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            hasError: false,
            msg: ''
        };
    }

    static getDerivedStateFromError(error: ErrorInfo) {
        return {
            hasError: true,
            msg: error
        }
    }

    render(){
        const { hasError } = this.state;
        if(hasError) {
            return (
                <Empty 
                    emptyTitle = '发生了未知的错误？！' 
                    content = { <p>回到<Link to = '/'>首页</Link>看看</p> }
                />
            )
        } else {
            return this.props.children;
        }
    }
}

export default SecurityLayout;
