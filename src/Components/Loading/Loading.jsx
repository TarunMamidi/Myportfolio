
import React from 'react';
import { HashLoader } from 'react-spinners';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-background">
            <div className="loading-container">
                <HashLoader loading={true}
                color="black"
                size={50}
                speedMultiplier={2}
                cssOverride={{ margin: '0 auto' }}/>
            </div>
        </div>
    );
};

export default Loading;
