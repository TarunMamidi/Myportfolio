import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import { Camera as ReactCameraPro } from 'react-camera-pro';
import './Camera.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/camera.png';

const Camera = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing, setClosing] = useState(false);
    const profileRef = useRef(null);
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);
    

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

    

    const handlePhotoTaken = () => {
        const image = cameraRef.current.takePhoto();
        setImage(image);
        
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`camera-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbara'>
                    <div className='adjtopa'>
                        <h2 className='app-titleca'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titleca'>Camera</h2>
                    </div>
                    <p className='close-buttonca' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contentca'>
                    
                    <ReactCameraPro ref={cameraRef} aspectRatio={16/9} />
                    <button onClick={handlePhotoTaken}>📷</button>
                    {image && <img src={image} alt='Taken' />}
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default Camera;
