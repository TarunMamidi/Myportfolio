import React, { useState, useRef, useEffect } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Mediaplayer.css';
import crossimg from '../../Assests/close.png';
import mediaIcon from '../../Assests/music.png'; 
import audio1 from '../../Assests/audio1.mp3';
import rotatingImg from '../../Assests/deadpoolimg.jpeg'; 

const MediaPlayer = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [size, setSize] = useState({ width: 700, height: 400 });
    const [closing, setClosing] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5; 
        }
    }, []);

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`media-player-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
            >
                <div className='top-bar'>
                    <div className='adjtop'>
                        <h2 className='app-title'><img src={mediaIcon} alt="Media" /></h2>
                        <h2 className='app-title'>Music</h2>
                    </div>
                    <p className='close-button' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='content'>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const fileURL = URL.createObjectURL(file);
                                audioRef.current.src = fileURL;
                                setIsPlaying(false);
                            }
                        }}
                    />

                    <div className='media-container'>
                        <audio ref={audioRef} controls autoPlay={isPlaying}>
                            <source src={audio1} type="audio/mp3" />
                        </audio>
                    </div>
                    <div className='controls'>
                        <button onClick={handlePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                    </div>
                </div>
                <div className='resizer' onMouseDown={handleMouseDown} />
                <div className='rotating-image'>
                    <img src={rotatingImg} alt="Rotating" />
                </div>
            </div>
        </DraggableWrapper>
    );
};

export default MediaPlayer;
