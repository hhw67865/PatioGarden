import { Modal } from "@mui/material";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from 'react'

const DeleteAccountModal = ({setUser, openDelete, setOpenDelete}) => {

    const [input, setInput] = useState("")
    const [error, setError] = useState(null)

    function handleDelete(e) {
        e.preventDefault()
        if (input==="delete") {
            fetch(`/api/users`,{
                method: "DELETE"
            })
            .then(r=> {
                if (r.ok) {
                    setError(null)
                    setInput("")
                    setUser(null)
                }
            })
        }
        else {
            setError('Please type "delete" to confirm')
        }
    }

  return (
    <>
        <Modal
            open={openDelete}
            onClose={()=>setOpenDelete(false)}            
        >
            <Box className="modal-box-update" sx={{height:'auto', bgcolor: 'background.paper',boxShadow: 24}}>
                <Typography sx={{pb:'3rem', fontWeight:'500'}} className="modal-title" variant="h5" component="h5">
                    Delete account
                </Typography>
                <Typography sx={{mb:10}}>
                    We’re sorry to see you go. Once your account is deleted, all of your contributions to this community will be permanently gone, including your profile, posts, and comments.     
                </Typography>               
                <form className="modal-update" onSubmit={handleDelete} >
                    <Typography variant="body1" component="p" sx={{color:'grey'}}>To confirm deletion, type "delete" below:</Typography>
                    <TextField
                        sx={{width:'100%'}}                                                
                        variant="standard"
                        name="email"
                        value={input}   
                        onChange={(e)=>setInput(e.target.value)}                    
                    /><br/>
                    {error?<Typography sx={{alignSelf:"start"}} className="errors" variant="body2" component="p"> {error}</Typography>:<br/>}
                                        
                    <Button color="error" type="submit" variant="outlined" sx={{p:'rem', marginTop:'2rem', alignSelf:'end'}}>
                        Delete Account
                    </Button>                      
                </form>
            </Box>  
        </Modal>
    </>
  );
}
export default DeleteAccountModal;