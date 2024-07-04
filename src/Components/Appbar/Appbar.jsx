import React from 'react';
import './Appbar.css'; 
import profileimg from '../../Assests/profile.png';
import aboutimg from '../../Assests/aboutimg.png';
import settingimg from '../../Assests/settings.png';
import terminalimg from '../../Assests/terminal.png';
import helpimg from '../../Assests/help.png';
import calimg from '../../Assests/calculator.png'
import browserimg from '../../Assests/browser.png'
import searchimg from '../../Assests/search.png'
import aiimg from '../../Assests/ai.png'
import chartimg from '../../Assests/skill.png';


const Appbar = ({ onAppDoubleClick }) => {
    const apps = [
        { id: 1, name: 'Profile', image: profileimg },
        { id: 0, name: 'Search', image: searchimg },
        { id: 2, name: 'About', image: aboutimg },
        { id: 3, name: 'Settings', image: settingimg },
        { id: 4, name: 'Info', image: helpimg },
        { id: 5, name: 'Terminal', image: terminalimg },
        { id: 6, name: 'Calculator', image: calimg },
        { id: 7, name: 'Browser', image: browserimg },
        { id: 8, name: 'AI Chatbot', image: aiimg },
        { id: 9, name: 'Skills', image: chartimg },


    ];

    const handleDoubleClick = (appId) => {
        if (onAppDoubleClick) {
            onAppDoubleClick(appId);
        }
    };

    return (
        <div className="taskbar">
            <ul className="app-list">
                {apps.map(app => (
                    <li
                        key={app.id}
                        className="app-item"
                        onDoubleClick={() => handleDoubleClick(app.id)}
                    >
                        <div className="tooltip">
                            <img src={app.image} alt={app.name} className="app-icon" />
                            <span className="tooltiptext">{app.name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appbar;
