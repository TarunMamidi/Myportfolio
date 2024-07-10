import React, { useState, useRef } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import './Help.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/help.png';
import profileapp from '../../Assests/profile.png'
import searchapp from '../../Assests/search.png'
import aboutapp from '../../Assests/aboutimg.png'
import settingsapp from '../../Assests/settings.png'
import terminalapp from '../../Assests/terminal.png'
import calcapp from '../../Assests/calculator.png'
import browserapp from '../../Assests/browser.png'
import chatbotapp from '../../Assests/ai.png'
import skillsapp from '../../Assests/skill.png'


const Help = ({ onClose, initialPosition, onUpdatePosition }) => {
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
                className={`help-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbarh'>
                    <div className='adjtoph'>
                        <h2 className='app-titleh'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titleh'>Help</h2>
                    </div>
                    <p className='close-buttonh' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div className='contenth'>
                    <div className='mainhead'>
                        <p className='hands'>🤌🏽</p>
                        <div className='sense'>
                            <p className='userguide'>User Guide</p>
                            <p className='comment'>It makes Sense...</p>
                        </div>
                    </div>
                    <div className='appscontext'>
                        <p className='appshead'>👉🏾 Apps and their uses</p>
                        <div className='mainprofile'>
                            <div className='profileapp'>
                                <p><img src={profileapp} alt="" /></p>
                                <p>ProfileApp</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Profile app, an integral part of our innovative and fully functional operating system. This app is designed to provide users with a seamless and efficient way to manage their personal information and preferences</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={searchapp} alt="" /></p>
                                <p>Search App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Introducing the Search app, a powerful and intuitive tool designed to enhance your experience within our innovative operating system. The Search app provides quick and easy access to all your files, apps, and settings, making navigation a breeze.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={aboutapp} alt="" /></p>
                                <p>About App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the About app, your comprehensive resource for detailed information about our cutting-edge operating system. The About app is designed to provide you with all the essential details about your OS, including its features, updates, and technical specifications.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={settingsapp} alt="" /></p>
                                <p>Settings App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Settings app, your centralized hub for customizing and managing your operating system. The Settings app is designed to give you complete control over your OS, allowing you to tailor it to your preferences and optimize your device's performance.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={terminalapp} alt="" /></p>
                                <p>Terminal App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Terminal app, a powerful and versatile tool designed for advanced users and developers. The Terminal app not only functions as a traditional command-line interface but also provides personalized information about you, creating a unique and integrated experience within our operating system.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={calcapp} alt="" /></p>
                                <p>Calculator App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Calculator app, your versatile and intuitive tool for all your mathematical needs. This app not only handles standard calculations with ease but also features an integrated BMI calculator to help you manage your health and fitness.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={browserapp} alt="" /></p>
                                <p>Browser App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Browser app, a powerful and versatile tool that not only provides you with seamless web browsing capabilities but also features a dedicated section to showcase your previous projects. This unique combination allows you to explore the web while conveniently accessing your personal portfolio.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={chatbotapp} alt="" /></p>
                                <p>AI Chatbot App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Introducing the Chatbot app, a smart and interactive communication tool integrated with advanced AI API capabilities. This app is designed to provide intelligent and personalized conversations, making it your perfect assistant for a wide range of tasks.</p>
                            </div>
                            <div className='profileapp'>
                                <p><img src={skillsapp} alt="" /></p>
                                <p>Skills App</p>
                            </div>
                            <div className='aboutprofile'>
                                <p>Welcome to the Skills Presentation app, your ultimate tool for showcasing your talents and expertise in a visually appealing and organized manner. This app is designed to highlight your skills with dynamic bar graph presentations, making it easy to impress potential employers, clients, or collaborators.</p>
                            </div>

                        </div>
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

export default Help;
