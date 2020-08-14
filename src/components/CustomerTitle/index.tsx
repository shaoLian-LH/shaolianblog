// @ts-nocheck
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface IMyTitileProps {
    title: string
}

const MyTitle:FC<IMyTitileProps> = (res) => {
    return (
        <div>
            <Helmet>
                <title>{ res.title }</title>
            </Helmet>
        </div>
    );
}

export default MyTitle;