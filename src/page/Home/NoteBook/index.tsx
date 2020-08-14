import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './notebook.scss';
const NoteBook: FC = () => {
    return (
        <div id = "notebook-main-div">
            <Link
                key = "notebook" 
                to = "/note"
            >
                <div id="book">
                    <div className = "cover">
                        <h2><span>Note</span> Book</h2>
                    </div>
                    <div className = "writer">
                        written by <b>shaoLian</b>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default NoteBook;