import React, { FC } from 'react';
import './postCardBox.scss';
import { useHistory } from 'react-router-dom';

interface IPostCardBox {
    className?: string
}

const PostCardBox: FC<IPostCardBox> = (props) => {

    const {
        className
    } = props;

    const history = useHistory();

    const handleClick = ()=> {
        history.push("/about");
    }

    return (
        <div className = { className !== undefined ? `postcard-box-main-div ${className}`: "postcard-box-main-div" } >
            <div className = "postcard-box-inset-div">
                <div className="postcord-card-div" onClick = { () => { handleClick() } }>
                    <p className="postcard-hint">About</p>
                </div>
            </div>
        </div>
    )
}

export default PostCardBox;