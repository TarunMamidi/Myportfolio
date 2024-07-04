import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Settings.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/settings.png';


import bg1 from '../../Assests/backg.jpg';
import bg2 from '../../Assests/back.jpg';
import bg3 from '../../Assests/backs.jpg';
import bg4 from '../../Assests/wallpaper.jpg';


const Settings = ({ onClose, initialPosition, onUpdatePosition, updateBgImage }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing, setClosing] = useState(false);
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

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`settings-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbars'>
                    <div className='adjtops'>
                        <h2 className='app-titles'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titles'>Settings</h2>
                    </div>
                    <p className='close-buttons' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contents'>
                    <p className='heada'>Wallpapers</p>
                    <div className='bg-icons'>
                        <img src={bg1} alt="Background 1" onClick={() => updateBgImage(bg1)} />
                        <img src={bg2} alt="Background 2" onClick={() => updateBgImage(bg2)} />
                        <img src={bg3} alt="Background 3" onClick={() => updateBgImage(bg3)} />
                        <img src={bg4} alt="Background 4" onClick={() => updateBgImage(bg4)} />
                        
                    </div>
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default Settings;
