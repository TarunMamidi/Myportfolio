import React from 'react'
import './Navbar.css'
import portimg from '../../Assests/user.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'><img src={portimg} alt="" /></div>
      <div className='content'>
        <div className='ic'>Home</div>
        <div className='ic'>About</div>
        <div className='ic'>Skills</div>
        <div className='ic'>Projects</div>
      </div>
    </div>
  )
}

export default Navbar
