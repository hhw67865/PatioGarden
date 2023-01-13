import { Modal } from "@mui/material";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from 'react'

const UsernameModal = ({openUsername,setOpenUsername, user, setUserUpdate}) => {

    const [username, setUsername] = useState(user?user.username:"")
    const [errors, setErrors] = useState(null)

    function submitForm (e) {
        e.preventDefault()
        fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username: username})
        })
        .then(r=>{
          if (r.ok) {
            setErrors(null)
            setOpenUsername(false)
            setUserUpdate(prev=>!prev)
          }
          else {
            r.json().then((obj)=>{
              setErrors(obj.errors)
            })
          }
        })
    }
    
  return (
    <>
        <Modal
            open={openUsername}
            onClose={()=>setOpenUsername(false)}            
        >
            <Box className="modal-box-update" sx={{height:'auto', bgcolor: 'background.paper',boxShadow: 24}}>
                <Typography sx={{pb:'3rem'}} className="modal-title" variant="h4" component="h4">
                    Username address
                </Typography>               
                <form className="modal-update" onSubmit={submitForm}>
                    <TextField
                        sx={{width:'100%'}}                   
                        label="Username"                                            
                        variant="standard"
                        name="username"
                        value={username}
                        onChange={e=>setUsername(e.target.value)}                       
                    /><br/>
                    
                    {errors?errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start"}} className="errors" variant="body2" component="p"> {error}</Typography>):<br/>}                    

                    <Button type="submit" variant="outlined" sx={{p:'rem', marginTop:'2rem', alignSelf:'end'}}>
                        Save Changes
                    </Button>                      
                </form>
            </Box>  
        </Modal>
    </>
  );
}
export default UsernameModal;