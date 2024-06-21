import React from 'react';
import './Appbar.css'; 
import profileimg from '../../Assests/profile.png';
import aboutimg from '../../Assests/aboutimg.png';
import settingimg from '../../Assests/settings.png';
import terminalimg from '../../Assests/terminal.png';
import helpimg from '../../Assests/help.png';
import calimg from '../../Assests/calculator.png'
import browserimg from '../../Assests/browser.png'


const Appbar = ({ onAppDoubleClick }) => {
    const apps = [
        { id: 1, name: 'Profile', image: profileimg },
        { id: 2, name: 'About', image: aboutimg },
        { id: 3, name: 'Settings', image: settingimg },
        { id: 4, name: 'Help', image: helpimg },
        { id: 5, name: 'Terminal', image: terminalimg },
        { id: 6, name: 'Calculator', image: calimg },
        { id: 7, name: 'Browser', image: browserimg },
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
