
import React from 'react';
import './Lock.css';

const Lock = ({ onUnlock }) => {
    return (
        <div className="lock-screen" onClick={onUnlock}>
            <div className="clocks">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default Lock;
