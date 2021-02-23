import React, { FC } from 'react';

const NoteBooklayout: FC = (props) => {

    const { children } = props;

    return (
        <div className = "note-book-main-layout">
            { children }
        </div>
    )
}

export default NoteBooklayout;