import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import {useState} from 'react'



const Login = ({openLogin, setOpenLogin, setUser}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)
    
    function handleSubmit (e) {
        e.preventDefault()
        fetch(`/api/login`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username:username.toLowerCase(), password:password})
        })
        .then(r=>{
          if (r.ok) {
            r.json().then(setUser)
            setErrors(null)
            setOpenLogin(false)
          }
          else {
            r.json().then((obj)=>{
              setErrors(obj.error)
              setTimeout(()=>setErrors(null),3000)
            })
          }
        })
    }

  return (
    <>
        <Modal
            open={openLogin}
            onClose={()=>setOpenLogin(false)}            
        >
            
            <Box className="modal-box" sx={{bgcolor: 'background.paper',boxShadow: 24}}>
                <Typography className="modal-title" variant="h4" component="h4">
                    Welcome back.
                </Typography>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <Typography className="errors" variant="body2" component="p">
                        {errors?errors:<br/>}
                    </Typography>
                    <br/>
                    <TextField
                        sx={{width:'60%'}}                   
                        label="Username"                    
                        variant="standard"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    /><br/>
                    <TextField    
                        sx={{width:'60%'}}                
                        label="Password"
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    /> <br/>
                    
                    <Button type="submit" variant="outlined" sx={{p:'rem', marginTop:'2rem'}}>
                        Login
                    </Button>
                </form>
            </Box>

        </Modal>
    </>
  );
}
export default Login;