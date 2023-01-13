import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import { useState, useEffect } from 'react';
import EmailModal from './EmailModal';
import ProfileModal from './ProfileModal';
import UsernameModal from './UsernameModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Account = ({usernames,user, setUser, setUserUpdate,setOpenUsername, openUsername}) => {

  const [openEmail,setOpenEmail] = useState(false)
  const [openProfile,setOpenProfile] = useState(false)
  const [locations,setLocations] = useState([])
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(false)

  
  useEffect(()=>{
    fetch(`/api/locations`)
    .then(r=>r.json())
    .then(setLocations)
  },[])

  function handlePasswordSubmit (e) {
      e.preventDefault()
      if (newPassword!==confirmPassword){
          setErrors(["Password confirmation does not match"])
          setTimeout(()=>setErrors(null),10000)
          return
      }
      fetch(`/api/password/update`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({old_password: oldPassword, new_password: newPassword})
      })
      .then(r=>{
        if (r.ok) {
          setErrors(null)
          setSuccess(true)
          setOldPassword("")
          setNewPassword("")
          setConfirmPassword("")
          setTimeout(()=>setSuccess(null),5000)          
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
      <Container sx={{display:'flex', flexDirection:'column' ,alignItems:'center', height:'100vh',borderRight: "1px solid black", borderLeft: "1px solid black", width:'850px' }}>        
        <Box sx={{ width: '750px',p:'10px'}}>
            <Typography sx={{my:'3rem'}} className="account" variant="h2" component="h2">
                Account
            </Typography>        
            <Button onClick={()=>setOpenEmail(true)} className="account-info" sx={{textTransform:'none', textAlign:'start', width: '700px'}}>
                <Typography sx={{alignSelf: "start", flex:'1'}} variant="body1" component="p">
                    Email address
                </Typography>
                <Typography variant="body1" component="p">
                    {user?user.email:null}
                </Typography>
            </Button><br/>
            <EmailModal setUserUpdate={setUserUpdate} user={user} openEmail={openEmail} setOpenEmail={setOpenEmail}/>

            <Button onClick={()=>setOpenUsername(true)} className="account-info" sx={{textTransform:'none', textAlign:'start', width: '700px'}}>
                <Typography sx={{alignSelf: "start", flex:'1'}} variant="body1" component="p">
                    Username
                </Typography>
                <Typography variant="body1" component="p">
                    {user? user.username:null}
                </Typography>
            </Button><br/>
            <UsernameModal usernames={usernames} user={user} openUsername={openUsername} setOpenUsername={setOpenUsername} setUserUpdate={setUserUpdate}/>

            <Button onClick={()=>setOpenProfile(true)} className="account-info" sx={{textTransform:'none', textAlign:'start', width: '700px'}}>
                <Typography sx={{alignSelf: "start", flex:'1'}} variant="body1" component="p">
                    Profile
                </Typography>
                <Typography variant="body1" component="p">
                  {user? user.name?user.name:"Add you name!":null}
                </Typography>
            </Button><br/>
            {user?<ProfileModal setUserUpdate={setUserUpdate} user={user} setUser={setUser} locations={locations} openProfile={openProfile} setOpenProfile={setOpenProfile}/>:null}
            

            

            <form onSubmit={handlePasswordSubmit}>
            <Typography sx={{textTransform:'none', textAlign:'start', width: '700px', mb:'2rem', mt:'5rem'}} variant="h5" component="h5">
                Change Password?
            </Typography>
            <TextField
                type="password"
                sx={{width:'60%'}}                   
                label="Old password"                    
                variant="standard"
                value={oldPassword}
                onChange={e=>setOldPassword(e.target.value)}
            /><br/>
            <TextField
                type="password"
                sx={{width:'60%'}}                   
                label="New password"                    
                variant="standard"
                value={newPassword}
                onChange={e=>setNewPassword(e.target.value)}
            /><br/>
            <TextField
                required
                type="password"
                sx={{width:'60%'}}                   
                label="Confirm new password"                    
                variant="standard"
                value={confirmPassword}
                onChange={e=>setConfirmPassword(e.target.value)}
            /><br/>
            <Button type="submit" variant="outlined" sx={{p:'rem', my:'2rem'}} startIcon={success?<CheckCircleIcon style={{color:'chartreuse'}}/>:null}>
                 Save Changes
            </Button>
            
            {errors?errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start"}} className="errors" variant="body2" component="p">{error}</Typography>):null}

            </form>
        </Box>
      </Container>
  )
}
export default Account;