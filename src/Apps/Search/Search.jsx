import React, { useState, useRef } from 'react';
import './Search.css';

import crossimg from '../../Assests/cross.png'; 

const Search = ({ onClose, onOpenProfile, onOpenCalculator, onOpenAbout, onOpenSettings, onOpenHelp, onOpenBrowser , onOpenTerminal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const searchRef = useRef(null);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose(); 
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      handleCommand(command);
      setInput('');
    }
  };

  const handleCommand = (command) => {
    switch (command) {
      case 'profile':
        onOpenProfile();
        break;
      case 'calculator':
        onOpenCalculator();
        break;
      case 'about':
        onOpenAbout();
        break;
      case 'settings':
        onOpenSettings();
        break;
      case 'Info':
        onOpenHelp();
        break;
      case 'browser':
        onOpenBrowser();
        break;
      case 'Terminal':
        onOpenTerminal();
        break;
      case 'exit':
        handleClose();
        break;
      default:
        console.log(`Command not found: ${command}`);
        
        break;
    }
  };

  return (
    <div className='search-container' ref={searchRef}>
      <input
        type="text"
        className={`search-input ${isOpen ? 'open' : ''}`}
        placeholder='Search'
        onClick={toggleSearch}
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
  
        <p className="close-button" onClick={handleClose}>
          <img src={crossimg} alt="Close" />
        </p>
      
    </div>
  );
}

export default Search;
