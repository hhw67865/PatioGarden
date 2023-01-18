import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Typography, Toolbar } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {Tooltip} from '@mui/material';
import {IconButton} from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import {useNavigate} from 'react-router-dom';




const Navbar = ({user, setUser,openSignup,setOpenSignup, usernames}) => {

    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null)
    const [openLogin,setOpenLogin] = useState(false)
    

    function handleLogout () {
        fetch(`/api/logout`, {method:"DELETE"})
        .then(r=>{
            if(r.ok) {
                setUser(null)
                setAnchorEl(null)
                navigate('/')
            }
        })
    }

  return (
    <>
        <AppBar position="static">
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: "flex" ,gap:"4rem"}}>
                        <Button onClick={()=>navigate("/")} sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mr: 2,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    display:"flex",
                                    alignItems:'center'
                                }}>
                                {/* <img src="../public/Logo.jpg" alt="Logo" style={{width:"100%", height:"35px"}}/> */}
                                <Avatar sx={{width:"50px",mr:"1rem", height:"50px"}} src="/Logo.jpg" alt="Logo"></Avatar> PatioGarden
                            </Typography>
                        </Button>
                        <Button onClick={()=>navigate("/plants")} sx={{ my: 2, color: 'white', display: 'block', letterSpacing: '.3rem' }}>
                            Plants
                        </Button>
                        <Button onClick={()=>navigate("/community")} sx={{ my: 2, color: 'white', display: 'block', letterSpacing: '.3rem' }}>
                            Community
                        </Button>                        
                        
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {user?
                        <>
                            <Tooltip title="Open settings">
                                <IconButton sx={{ p: 0 }} onClick={e=>setAnchorEl(e.currentTarget)}>
                                    <Avatar alt={user.username} src={user.image_url} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                keepMounted
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={()=>setAnchorEl(null)}
                                >
                                <Typography textAlign="center" sx={{px:2, py:1, fontWeight:500}}>{user.username}</Typography>   
                                <MenuItem onClick={()=>{navigate(`/profile/${user.username}`); setAnchorEl(null)}}><Typography textAlign="center">Profile</Typography></MenuItem>
                                <MenuItem onClick={()=>{navigate("/account");setAnchorEl(null)}} ><Typography textAlign="center">Account</Typography></MenuItem>
                                <MenuItem onClick={handleLogout}><Typography textAlign="center">Logout</Typography></MenuItem>
                            </Menu>
                        </>:
                        <Toolbar disableGutters>
                            <Button onClick={()=>setOpenLogin(true)} sx={{  color: 'white', display: 'block' }}>
                                Login
                            </Button> 
                            <Login setOpenSignup={setOpenSignup} setUser={setUser} openLogin={openLogin} setOpenLogin={setOpenLogin}/>                           
                            <Button onClick={()=>setOpenSignup(true)} sx={{  color: 'white', display: 'block' }}>
                                Signup
                            </Button>
                            <Signup usernames={usernames} setUser={setUser} setOpenLogin={setOpenLogin} openSignup={openSignup} setOpenSignup={setOpenSignup}/>
                        </Toolbar>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        
    </>
  );
}
export default Navbar;