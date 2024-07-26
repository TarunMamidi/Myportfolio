import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import portimg from '../../Assests/user.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='navbar'>
      <div className='logo'><img src={portimg} alt="Logo" /></div>
      <div className='menu-icon' onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`content ${isOpen ? 'open' : ''}`}>
        <div className='close-icon' onClick={toggleMenu}><FaTimes /></div>
        <div className='ic'>Home</div>
        <div className='ic'>About</div>
        <div className='ic'>Skills</div>
        <div className='ic'>Projects</div>
      </div>
    </div>
  );
}

export default Navbar;
