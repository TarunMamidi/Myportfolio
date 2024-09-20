import React, { useState, useEffect } from 'react';
import './LockScreen.css';

const LockScreen = ({ onUnlock }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleScreenClick = () => {
        setIsLocked(false); // Trigger unlock animation
        setTimeout(() => {
            onUnlock(); // Call onUnlock after the animation finishes
        }, 1000); // Adjust the timeout to match the CSS transition duration
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleScreenClick();
        }
    };

    return (
        <div
            className={`lockscreen-container ${isLocked ? '' : 'unlocked'}`}
            onClick={handleScreenClick}
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className="lockscreen-content">
                <div className="clocks">{currentTime.toLocaleTimeString()}</div>
                <div className='instruction'>Click anywhere to unlock</div>
            </div>
        </div>
    );
};

export default LockScreen;
