import React from 'react'
import Logo from '../assets/CommonSenseLogo.png';
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReorderIcon from '@mui/icons-material/Reorder';
function Navbar(props) {
  const { signIn, signOut, isAuthenticated } = props
  return (

    <div className="navbar">
      <div className="leftSide">
      <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="rightSide">
        <Button
          variant='contained'
          component={Link}
          to="/leaderboard"
          sx={{ backgroundColor: '#425f72', color: 'black' }}

        >Leaderboard</Button>
        <Button
          variant='contained'
          component={Link}
          to="/events"
          sx={{ backgroundColor: '#425f72', color: 'black' }}
          >Map
        </Button>
        <Button
          variant='contained'
          component={Link}
          to="/profile"
          sx={{ backgroundColor: '#425f72', color: 'black' }}
        >Profile</Button>
        <Button
          variant="contained"
          component={Link}
          to="/about"
          sx={{ backgroundColor: '#425f72', color: 'black' }}
        >
          About
        </Button>
        <Button
          onClick={isAuthenticated ? signOut : signIn}
          variant="contained"
          component={Link}
          to="/home"
          sx={{ backgroundColor: '#425f72', color: 'black' }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>

        <button>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}



export default Navbar;