import React, { useState, useEffect, useRef } from 'react';
import './Bar.css';
import Calendar from '../Calendar/Calendar';

const Bar = ({ notification }) => {
    const [time, setTime] = useState(new Date());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [is24HourFormat, setIs24HourFormat] = useState(true);

    const clockRef = useRef(null);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);

        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clockRef.current && !clockRef.current.contains(event.target)) {
                setShowMessage(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const formatTime = (date) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = String(date.getDate()).padStart(2, '0');
        const month = monthsOfYear[date.getMonth()];

        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const timeString = is24HourFormat
            ? `${hours}:${minutes}:${seconds}`
            : `${hours % 12 || 12}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;

        return `${dayOfWeek} ${month} ${dayOfMonth} ${timeString}`;
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };

    const toggleTimeFormat = () => {
        setIs24HourFormat(!is24HourFormat);
    };

    return (
        <div className='main-bar'>
            <p className='portfolio'>🤌🏽 Tarun's OS</p>
            <div className='clock' onClick={toggleMessage} ref={clockRef}>
                {formatTime(time)}
            </div>
            <div className={`message-box ${showMessage ? 'active' : ''}`}>
                <div>
                    
                    <p>{notification}</p>
                    <button className='time-format-toggle' onClick={toggleTimeFormat}>
                        {is24HourFormat ? 'Change formate to 12hr' : 'Change formate to 24hr'}
                    </button>
                    <Calendar/>
                </div>
            </div>
            <button className='fullscreen-button' onClick={toggleFullscreen}>
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
        </div>
    );
};

export default Bar;
