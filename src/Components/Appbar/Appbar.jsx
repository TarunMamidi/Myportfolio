import React, { useState, useRef, useEffect } from 'react';
import './Appbar.css'; 
import profileimg from '../../Assests/profile.png';
import aboutimg from '../../Assests/aboutimg.png';
import settingimg from '../../Assests/settings.png';
import terminalimg from '../../Assests/terminal.png';
import helpimg from '../../Assests/help.png';
import calimg from '../../Assests/calculator.png';
import browserimg from '../../Assests/browser.png';
import searchimg from '../../Assests/search.png';
import aiimg from '../../Assests/ai.png';
import chartimg from '../../Assests/skill.png';
import cameraimg from '../../Assests/camera.png';
import menuimg from '../../Assests/window.png';


const Appbar = ({ onAppDoubleClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const apps = [
        { id: 0, name: 'Search', image: searchimg },
        { id: 1, name: 'Profile', image: profileimg },
        { id: 2, name: 'About', image: aboutimg },
        { id: 3, name: 'Settings', image: settingimg },
        { id: 4, name: 'Info', image: helpimg },
        { id: 5, name: 'Terminal', image: terminalimg },
        { id: 6, name: 'Calculator', image: calimg },
        { id: 7, name: 'Browser', image: browserimg },
        { id: 8, name: 'AI Chatbot', image: aiimg },
        { id: 9, name: 'Skills', image: chartimg },
        { id: 10, name: 'Camera', image: cameraimg },
    ];

    const handleAppClick = (appId) => {
        if (onAppDoubleClick) {
            onAppDoubleClick(appId);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setSearchInput('');
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            const filteredApp = apps.find(app => 
                app.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            if (filteredApp) {
                handleAppClick(filteredApp.id);
            }
        }
    };

    const filteredApps = apps.filter(app => 
        app.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className="appbar-container">
            <div className="appbar">
                <div className="app-item" onClick={toggleMenu}>
                    <img src={menuimg} alt="Menu" className="app-icon" />
                </div>
                <ul className="app-list">
                    {apps.map(app => (
                        <li
                            key={app.id}
                            className="app-item"
                            onDoubleClick={() => handleAppClick(app.id)}
                        >
                            <div className="tooltip">
                                <img src={app.image} alt={app.name} className="app-icon" />
                                <span className="tooltiptext">{app.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {isMenuOpen && (
                <div className="app-menu" ref={menuRef}>
                    <ul className="menu-list">
                        {filteredApps.map(app => (
                            <li
                                key={app.id}
                                className="menu-item"
                                onClick={() => handleAppClick(app.id)}
                            >
                                <img src={app.image} alt={app.name} className="app-icon" />
                                <span className="app-name">{app.name}</span>
                            </li>
                        ))}
                    </ul>
                   
                        <input
                                type="text"
                                placeholder="Search"
                                className='search-inputs'
                                value={searchInput}
                                onChange={handleInputChange}
                                onKeyPress={handleInputKeyPress}
                            />
                        
                        
                    
                </div>
            )}
        </div>
    );
};

export default Appbar;
