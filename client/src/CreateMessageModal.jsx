import { Modal } from "@mui/material";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import {useState, useEffect} from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import UserCard from "./UserCard";



const CreateMessageModal = ({openCompose, setOpenCompose,setContacts, contacts, setReceiver}) => {
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null)

    useEffect(()=>{
        if (search!==""){
        fetch(`/api/search_users/${search}`)
        .then(r=>r.json())
        .then(setFilteredUsers)
        }
        else {
            setFilteredUsers([])
        }
    },[search])

    const filteredUsersArray = filteredUsers.map((searchedUser,i)=><UserCard key={i} setSearch={setSearch} searchedUser={searchedUser} />)

    function handleNext (e) {
        e.preventDefault()
        if (filteredUsers[0]) {  
            console.log(contacts)
            console.log(filteredUsers[0].username)          
            if (contacts.filter((contact)=>filteredUsers[0].username===contact.username).length>0) {
                setSearch("")
                setOpenCompose(false)
                setReceiver(contacts.filter((contact)=>filteredUsers[0].username===contact.username)[0])

            }
            else {
                setContacts(prev=>[filteredUsers[0],...prev])
                setSearch("")
                setOpenCompose(false)
            }
        }
        else {
            setError("No user to message")
        }
    }

  return (
    <>
        <Modal
            open={openCompose}
            onClose={()=>setOpenCompose(false)}            
        >
            <Box className="modal-box-update" sx={{height:'auto', bgcolor: 'background.paper',boxShadow: 24, p:1, width:400}}>
                <Typography sx={{pb:'1rem', textAlign:'center'}} className="modal-title" variant="h6" component="h6">
                    New message
                </Typography>
                <hr/>
                <form onSubmit={handleNext}>
                    <Grid container spacing={1} sx={{px:"2rem", display:'flex', alignItems:'center'}}>
                        <Grid xs='auto'>
                            <Typography sx={{p:0}} className="modal-title" variant="h6" component="h6">
                                To:
                            </Typography>
                        </Grid>
                        <Grid xs >
                            <TextField value={search} onChange={(e)=>{setSearch(e.target.value);setError(null)}} sx={{width:"100%"}} variant="standard"/>
                        </Grid>
                        <Grid xs='auto' sx={{p:0}}>
                            <Button type="submit">Next</Button>
                        </Grid>
                    </Grid>
                </form>
                <Box sx={{display:'flex', flexDirection:'column', overflowY:'scroll', height:300, mt:2}}>
                    {error?<Typography sx={{alignSelf:"start"}} className="errors" variant="body2" component="p"> {error}</Typography>:<br/>}
                    {filteredUsersArray}
                </Box>
            </Box>  
        </Modal>
    </>
  );
}
export default CreateMessageModal;