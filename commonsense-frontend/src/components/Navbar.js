import React from 'react'
import Logo from '../assets/CommonSenseLogo.png';
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='leftSide'>
        <img src={Logo}/>
      </div>
      <div className='rightSide'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user">User</Link>
      </div>
    </div>
  )
}

export default Navbar
