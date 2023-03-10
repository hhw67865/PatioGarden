import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Avatar, Typography } from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import { useState, useEffect } from 'react';
import EmailModal from './EmailModal';
import ProfileModal from './ProfileModal';
import UsernameModal from './UsernameModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteAccountModal from './DeleteAccountModal';
import { useRef } from 'react';
import PostCard from './PostCard';


const Account = ({usernames,user, setUser,userUpdate, setUserUpdate,setOpenUsername, openUsername}) => {

  const [openEmail,setOpenEmail] = useState(false)
  const [openProfile,setOpenProfile] = useState(false)
  const [locations,setLocations] = useState([])
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState(null)
  const [success, setSuccess] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [likedPosts, setLikedPosts] = useState([])

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  
  
  useEffect(()=>{
    fetch(`/api/locations`)
    .then(r=>r.json())
    .then(setLocations)
  },[])

  useEffect(()=>{
    fetch(`/api/liked_posts`)
    .then(r=>r.json())
    .then(setLikedPosts)
  },[userUpdate])

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
            setOldPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setTimeout(()=>setErrors(null),10000)
          })
        }
      })
  }

  function handleProfilePicture (e) {
    e.preventDefault()
    const data = new FormData()
    data.append("image", e.target.image.files[0])
    fetch(`/api/users/image`, {
        method: "PATCH",        
        body: data
        })
        .then(()=>{
          setImagePreviewUrl(null)
          setUserUpdate(prev=>!prev)
        })
    
  }

  const fileInputRef = useRef()
  const handleClick = () => {
    fileInputRef.current.click()
  }

  function handleImageChange (e) {
    e.preventDefault()
    let reader = new FileReader();
    let file = e.target.files[0]

    reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(file)
    
  }
  

  return (
      <Container sx={{display:'flex', flexDirection:'column' ,alignItems:'center', height:'100%',borderRight: "1px solid black", borderLeft: "1px solid black", width:'850px' }}>        
        <Box sx={{ width: '750px',p:'10px', mt:'2rem'}}>
            <div style={{display: "flex", alignItems:'center'}}>
                <Typography sx={{my:'3rem', flex:1}} className="account" variant="h2" component="h2">
                    Account
                </Typography>
                <Avatar className="account-avatar" sx={{mr:'3rem', width:"200px", height: "200px"}} alt={user.username} src={imagePreviewUrl?imagePreviewUrl:user.image_url}></Avatar>
            </div>
            <form style={{display:"flex",justifyContent:"end",alignItems:'center', margin:"1rem"}} onSubmit={handleProfilePicture}>                
                <input type='file' ref={fileInputRef} name="image" onChange={handleImageChange} style={{display: 'none'}}/>
                {imagePreviewUrl?<Button variant="outlined" color="error" onClick={()=>setImagePreviewUrl(null)}>Cancel Changes</Button>:<Button variant="outlined" color="success" onClick={handleClick}>Update Picture</Button>}
                <Button type="submit" variant='outlined' sx={{mr:"1rem", ml:"1rem"}} >Save</Button>
            </form>        
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
            <Button onClick={()=>setOpenDelete(true)} sx={{mt:'4rem'}} variant="outlined" color="error">Delete Account</Button>
            <DeleteAccountModal setUser={setUser} openDelete={openDelete} setOpenDelete={setOpenDelete}/>
            <Typography sx={{textTransform:'none', textAlign:'center', width: '700px', mb:'2rem', mt:'5rem'}} variant="h4" component="h4">
                Liked Posts
            </Typography>
            <hr/>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
              {likedPosts.map((post,i)=><PostCard key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
            </Box>
        </Box>
      </Container>
  )
}
export default Account;