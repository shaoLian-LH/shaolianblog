import React, { Component, ErrorInfo } from 'react';

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
        const { hasError, msg } = this.state;
        if(hasError) {
            return (
                <h1>{ msg }</h1>
            )
        }
        return this.props.children;
    }
}

export default SecurityLayout;
