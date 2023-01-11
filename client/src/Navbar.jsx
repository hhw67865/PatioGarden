import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Typography, Toolbar, Icon } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import {Button} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Modal from '@mui/material/Modal';

const Navbar = ({user, setUser}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [openLogin,setOpenLogin] = useState(false)
    const [openSignup,setOpenSignup] = useState(false)

  return (
    <>
        <AppBar position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                LOGO
                            </Typography>
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Logo
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Logo
                        </Button>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            Logo
                        </Button>
                        
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {user?
                        <>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }} onClick={e=>setAnchorEl(e.currentTarget)}>
                                    <Avatar alt="Remy Sharp" src="" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                keepMounted
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={()=>setAnchorEl(null)}
                                >
                                <MenuItem><Typography textAlign="center">Profile</Typography></MenuItem>
                                <MenuItem><Typography textAlign="center">Account</Typography></MenuItem>
                                <MenuItem><Typography textAlign="center">Logout</Typography></MenuItem>
                            </Menu>
                        </>:
                        <Toolbar disableGutters>
                            <Button onClick={()=>setOpenLogin(true)} sx={{  color: 'white', display: 'block' }}>
                                Login
                            </Button> 
                            <Login setUser={setUser} openLogin={openLogin} setOpenLogin={setOpenLogin}/>                           
                            <Button onClick={()=>setOpenSignup(true)} sx={{  color: 'white', display: 'block' }}>
                                Signup
                            </Button>
                            <Signup setUser={setUser} setOpenLogin={setOpenLogin} openSignup={openSignup} setOpenSignup={setOpenSignup}/>
                        </Toolbar>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        
    </>
  );
}
export default Navbar;