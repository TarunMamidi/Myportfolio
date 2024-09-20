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
import pinnedimg from '../../Assests/pinned.png';
import unpinnedimg from '../../Assests/unpinned.png'
import cusimg from '../../Assests/application.png'
import mediaimg from '../../Assests/music.png'


const Appbar = ({ onAppDoubleClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [apps, setApps] = useState([
        { id: 0, name: 'Search', image: searchimg, pinned: true },
        { id: 1, name: 'Profile', image: profileimg, pinned: true },
        { id: 2, name: 'About', image: aboutimg, pinned: true },
        { id: 3, name: 'Settings', image: settingimg, pinned: true },
        { id: 4, name: 'Info', image: helpimg, pinned: true },
        { id: 5, name: 'Terminal', image: terminalimg, pinned: true },
        { id: 6, name: 'Calculator', image: calimg, pinned: true },
        { id: 7, name: 'Browser', image: browserimg, pinned: true },
        { id: 8, name: 'AI Chatbot', image: aiimg, pinned: false },
        { id: 9, name: 'Skills', image: chartimg, pinned: false },
        { id: 10, name: 'Camera', image: cameraimg, pinned: false },
        { id: 11, name: 'Music', image: mediaimg, pinned: false },
    ]);

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

    const handlePinClick = (appId) => {
        setApps(apps.map(app => 
            app.id === appId ? { ...app, pinned: !app.pinned } : app
        ));
    };

    const filteredApps = apps.filter(app => 
        app.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const pinnedApps = apps.filter(app => app.pinned);

    return (
        <div className="appbar-container">
            <div className="appbar">
                <div className="app-item" onClick={toggleMenu}>
                    <p className='appmenu'><img src={cusimg} alt="" /></p>
                </div>
                <ul className="app-list">
                    {pinnedApps.map(app => (
                        <li
                            key={app.id}
                            className="app-item"
                            onClick={() => handleAppClick(app.id)}
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
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        handlePinClick(app.id); 
                                    }} 
                                    className="pin-button"
                                >
                                    {app.pinned ? <img className='pinned' src={pinnedimg} alt="" /> : <img className='unpinned' src={unpinnedimg} alt="" />}
                                </button>
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
