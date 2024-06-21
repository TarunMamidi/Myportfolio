import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './BrowserApp.css';
import crossimg from '../../Assests/close.png';
import browserimg from '../../Assests/browser.png';

const BrowserApp = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 800, height: 600 });
    const [closing, setClosing] = useState(false);
    const [url, setUrl] = useState('https://www.example.com');
    const [iframeUrl, setIframeUrl] = useState('https://www.example.com');
    const browserRef = useRef(null);

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

    const handleGoClick = () => {
        let finalUrl = url.trim(); 
        if (finalUrl && !finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl; 
        }
        setIframeUrl(finalUrl);
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`browser-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={browserRef}
            >
                <div className='topbarb'>
                    <h2 className='app-titleb'><img src={browserimg} alt="Browser" /></h2>
                    <input 
                        type="text" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)} 
                        placeholder="Enter URL" 
                    />
                    <button onClick={handleGoClick}>Go</button>
                    <p className='close-buttonb' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contentb'>
                    {iframeUrl && <iframe src={iframeUrl} title="Browser Frame" />}
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default BrowserApp;
