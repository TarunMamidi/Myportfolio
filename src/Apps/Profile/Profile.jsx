import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Profile.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/profile.png';
import minimizeimg from '../../Assests/mini.png';
import maximizeimg from '../../Assests/maximize.png';
import restoreimg from '../../Assests/restore.png';
import Typewriter from '../../Components/Typewriter/Typewriter';
import Navbar from '../../Components/Navbar/Navbar';

const Profile = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing, setClosing] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(true);
    const profileRef = useRef(null);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500);
    };

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`profiles-app ${closing ? 'closing' : ''} ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}
                style={{ width: isMaximized ? '100%' : size.width, height: isMaximized ? '100%' : size.height }}
                ref={profileRef}
            >
                <div className='topbarp'>
                    <div className='adjtop'>
                        <h2 className='app-titlep'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titlep'>Profile</h2>
                    </div>
                    <div className='window-controls'>
                        <img src={minimizeimg} alt="Minimize" onClick={handleMinimize} className='window-control-button' />
                        <img src={isMaximized ? restoreimg : maximizeimg} alt="Maximize" onClick={handleMaximize} className='window-control-button' />
                        <img src={crossimg} alt="Close" onClick={handleClose} className='window-control-button' />
                    </div>
                </div>
                <div className='contentp'>
                    <Navbar className='navbar' />
                    {!isMinimized && <Typewriter />}
                </div>
                {!isMinimized && (
                    <div
                        className='resizer'
                        onMouseDown={handleMouseDown}
                    />
                )}
            </div>
        </DraggableWrapper>
    );
};

export default Profile;
