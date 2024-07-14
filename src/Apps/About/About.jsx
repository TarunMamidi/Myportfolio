import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './About.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/aboutimg.png';
import closeimg from '../../Assests/close.png';

const About = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [closing, setClosing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [copied, setCopied] = useState(false);
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

    const togglePopup = () => {
        setShowPopup(!showPopup); 
    };

    const handleCopy = () => {
        const githubLink = 'https://github.com/TarunMamidi/Myportfolio';
        const linkedInLink = 'https://www.linkedin.com/in/sriman-tarun-mamidi-aa5371243?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BBh9kcxBaRVqLF2Uyp9zjGQ%3D%3D';
        const details = `Github Repo: ${githubLink}\nLinkedIn: ${linkedInLink}`;

        navigator.clipboard.writeText(details).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); 
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                 className={`about-app ${closing ? 'closing' : ''} ${showPopup ? 'blur' : ''}`}
                 style={{ width: size.width, height: size.height }}
                 ref={profileRef}
            >
                <div className='topbara'>
                    <div className='adjtopa'>
                        <h2 className='app-titlea'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titlea'>About</h2>
                    </div>
                    <p className='close-buttona' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contenta'>
                    <div className='aboutos'>
                        <p><span className='handnew'>🤌🏽</span> Tarun's OS</p>
                        <div className='about-sec-main'>
                            <div className='about-sec'>
                                <p className='dn'> Device Name</p>
                                <p className='dns'> Tarun's Laptop</p>
                            </div>
                            <div className='about-sec-pen'>
                                <p>🖉</p>
                            </div>
                        </div>
                        <div className='adjabout'>
                            <div className='about-sec-1-t'>
                                <p className='about-content'>Operating System</p>
                                <p className='about-content-c'>Tarun's OS 1.0 LTS</p>
                            </div>
                            <div className='about-sec-1'>
                                <p className='about-content'>Built With</p>
                                <p className='about-content-c'>ReactJS</p>
                            </div>
                            <div className='about-sec-1'>
                                <p className='about-content'>Inspired From</p>
                                <p className='about-content-c'>Ubuntu</p>
                            </div>
                            <div className='about-sec-1'>
                                <p className='about-content'>Type of OS</p>
                                <p className='about-content-c'>Linux</p>
                            </div>
                            <div className='about-sec-1-b' onClick={togglePopup}>
                                <p className='about-content'>Project Details</p>
                                <p className='about-content-c'>⮚</p>
                            </div>
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <div className='popup'>
                        <div className='popup-content'>
                            <div className='popupmain'>
                                <p className='popuphead'>Project Details</p>
                                <div className='copy'>
                                    <p className='copyopt' onClick={handleCopy}>
                                        {copied ? 'Copied' : '㊢ Copy'}
                                    </p>
                                    <p className='crossimg' onClick={togglePopup}><img src={closeimg} alt="Close" /></p>
                                </div>
                            </div>
                            <div className='popupdet'>
                                <p>Github Repo</p>
                                <a href='https://github.com/TarunMamidi/Myportfolio' style={{textDecoration:'none', color:'#9d9d9d'}}>Git Repo</a>
                            </div>
                            <div className='popupdet-1'>
                                <p>LinkedIn</p>
                                <a href='https://www.linkedin.com/in/sriman-tarun-mamidi-aa5371243?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BBh9kcxBaRVqLF2Uyp9zjGQ%3D%3D' style={{textDecoration:'none', color:'#9d9d9d'}}>LinkedIn</a>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
            </div>
        </DraggableWrapper>
    );
};

export default About;
