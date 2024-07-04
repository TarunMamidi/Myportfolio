import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Myai.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/ai.png';

const About = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing,setClosing] = useState(false);
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
                className={`myai-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbarm'>
                    <div className='adjtopm'>
                        <h2 className='app-titlem'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titlem'>AI Chatbot</h2>
                    </div>
                    <p className='close-buttonm' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contentm'>
                    <p>This is the content of the AI Chatbot app.</p>
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default About;
