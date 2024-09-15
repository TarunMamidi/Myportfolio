import React, { useState, useEffect } from 'react';
import './App.css';
import Appbar from './Components/Appbar/Appbar';
import Profile from './Apps/Profile/Profile';
import About from './Apps/About/About';
import Settings from './Apps/Settings/Settings';
import Terminal from './Apps/Terminal/Terminal';
import Help from './Apps/Help/Help';
import Calculator from './Apps/Calculator/Calculator';
import BrowserApp from './Apps/BrowserApp/BrowserApp';
import Bar from './Components/Bar/Bar';
import CustomLoading from './Components/Loading/Loading';
import LockScreen from './Components/LockScreen/LockScreen';
import Search from './Apps/Search/Search';
import Myai from './Apps/Myai/Myai';
import Charts from './Apps/Charts/Charts';
import defaultimg from './Assests/wallpaper.jpg';
import Camera from './Apps/Camera/Camera';

const getRandomPosition = () => {
    const appWidth = 300;
    const appHeight = 200;
    const margin = 10;

    const x = Math.floor(Math.random() * (window.innerWidth - appWidth - margin * 2 - 1000)) + margin;
    const y = Math.floor(Math.random() * (window.innerHeight - appHeight - margin * 2 - 100)) + margin;

    return { x, y };
};

const App = () => {
    const [activeApps, setActiveApps] = useState([]);
    const [activeAppId, setActiveAppId] = useState(null);
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLocked, setIsLocked] = useState(true);
    const [bgImage, setBgImage] = useState(defaultimg);

    const handleAppDoubleClick = (appId) => {
        const existingApp = activeApps.find(app => app.id === appId);
        if (!existingApp) {
            setActiveApps([...activeApps, { id: appId, position: getRandomPosition() }]);
            setActiveAppId(appId);
        } else {
            setActiveAppId(appId);
        }
    };

    const handleCloseApp = (appId) => {
        setActiveApps(activeApps.filter(app => app.id !== appId));
        if (activeAppId === appId) {
            setActiveAppId(null);
        }
    };

    const handleUpdatePosition = (appId, newPosition) => {
        setActiveApps(activeApps.map(app =>
            app.id === appId ? { ...app, position: newPosition } : app
        ));
    };

    const handleAppClick = (appId) => {
        const existingApp = activeApps.find(app => app.id === appId);
        if (existingApp) {
            setNotification(`App ${appId} is already active.`);
        }
        setActiveAppId(appId);
    };

    useEffect(() => {
        setTimeout(() => setLoading(false), 3000);
    }, []);

    const handleUnlock = () => {
        setIsLocked(false);
    };

    const handleSleep = () => {
        setIsLocked(true); // Set the app to locked mode when sleep is clicked
    };

    const updateBgImage = (newImage) => {
        setBgImage(newImage);
    };

    return (
        <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
            {loading ? (
                <CustomLoading />
            ) : (
                <>
                    {isLocked && <LockScreen onUnlock={handleUnlock} />}
                    {!isLocked && (
                        <>
                            <Bar notification={notification} handleSleep={handleSleep} /> {/* Pass handleSleep to Bar */}
                            <Appbar onAppDoubleClick={handleAppDoubleClick} />
                            <div className="app-container">
                                {activeApps.map(app => {
                                    const commonProps = {
                                        key: app.id,
                                        onClose: () => handleCloseApp(app.id),
                                        initialPosition: app.position,
                                        onUpdatePosition: (pos) => handleUpdatePosition(app.id, pos),
                                        onClick: () => handleAppClick(app.id),
                                        className: app.id === activeAppId ? 'active' : ''
                                    };

                                    switch (app.id) {
                                        case 1:
                                            return <Profile {...commonProps} />;
                                        case 2:
                                            return <About {...commonProps} />;
                                        case 3:
                                            return <Settings {...commonProps} updateBgImage={updateBgImage} />;
                                        case 4:
                                            return <Help {...commonProps} />;
                                        case 5:
                                            return <Terminal {...commonProps} />;
                                        case 6:
                                            return <Calculator {...commonProps} />;
                                        case 7:
                                            return <BrowserApp {...commonProps} />;
                                        case 8:
                                            return <Myai {...commonProps} />;
                                        case 9:
                                            return <Charts {...commonProps} />;
                                        case 0:
                                            return <Search {...commonProps} />;
                                        case 10:
                                            return <Camera {...commonProps} />;
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default App;
