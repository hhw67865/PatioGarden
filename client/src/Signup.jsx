import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useState } from 'react'
import ParkIcon from '@mui/icons-material/Park';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const Signup = ({openSignup, setOpenSignup, setOpenLogin}) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState(null)
    const [confirmation, setConfirmation] = useState(false)

    function handleChange (e) {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (confirmPassword!==formData.password) {
            setErrors(["Password confirmation does not match"])
            setTimeout(()=>setErrors(null),5000)
            return
        }
        fetch(`api/signup`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData)
        })
        .then(r=>{
          if (r.ok) {            
            setErrors(null)
            setFormData({
                username: "",
                email: "",
                password: ""
            })
            setConfirmPassword("")
            setConfirmation(true)
            setTimeout(()=>{
                setConfirmation(false)
                setOpenSignup(false)
                setOpenLogin(true)
            }, 2000)

          }
          else {
            r.json().then((obj)=>{
              setErrors(obj.errors)
              setTimeout(()=>setErrors(null),10000)
            })
          }
        })
    }

    return (
      <>
          <Modal
              open={openSignup}
              onClose={()=>setOpenSignup(false)}            
          >
              <Box className="modal-box" sx={{bgcolor: 'background.paper',boxShadow: 24}}>
                <Typography className="modal-title" variant="h4" component="h4">
                    {confirmation? "Welcome To PatioGarden.":"Join PatioGarden."}
                </Typography>
                {confirmation?<><Typography className="signup-confirmation" variant="h3" component="h3">
                    <CheckCircleOutlineIcon fontSize='large'/> Signup Complete!
                </Typography></>:
                <form className="modal-form" onSubmit={handleSubmit}>
                    <TextField
                        sx={{width:'60%'}}                   
                        label="Username"                                            
                        variant="standard"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    /><br/>
                    <TextField
                        sx={{width:'60%'}}                   
                        label="Email"                    
                        variant="standard"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    /><br/>
                    <TextField    
                        sx={{width:'60%'}}                
                        label="Password"
                        type="password"
                        variant="standard"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    /> <br/>
                    <TextField
                            
                        required
                        sx={{width:'60%'}}                
                        label="Confirm Password"
                        type="password"
                        variant="standard"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    /> <br/>
                    {errors?errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start", marginLeft:"20%"}} className="errors" variant="body2" component="p"><ParkIcon sx={{fontSize:"80%"}}/>  {error}</Typography>):null}
                    <Button type="submit" variant="outlined" sx={{p:'rem', marginTop:'2rem'}}>
                        Signup
                    </Button>
                </form>}
            </Box>
  
          </Modal>
      </>
    );
  }
export default Signup;