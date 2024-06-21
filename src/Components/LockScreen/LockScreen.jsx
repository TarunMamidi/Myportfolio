import React, { useState, useEffect } from 'react';
import './LockScreen.css';

const LockScreen = ({ onUnlock }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    

    const handleScreenClick = () => {
        onUnlock();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onUnlock();
        }
    };

    return (
        <div className="lockscreen-container" onClick={handleScreenClick} onKeyDown={handleKeyPress} tabIndex={0}>
            <div className="lockscreen-content">
                <div className="clocks">{currentTime.toLocaleTimeString()}</div>
                <div className='instruction'>Click any Where to Unlock</div>
                
            </div>
        </div>
    );
};

export default LockScreen;
