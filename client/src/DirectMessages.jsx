import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import PostCard from './PostCard';
import FollowButton from './FollowButton';
import PostCreation from './PostCreation';
import {TextField} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PestControlIcon from '@mui/icons-material/PestControl';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ChatBox from './ChatBox';
import ContactCard from './ContactCard';
import CreateMessageModal from './CreateMessageModal';


const DirectMessages = ({user}) => {

  let navigate = useNavigate()

    
    const [contacts, setContacts] = useState([])
    const [receiver, setReceiver] = useState(null)
    const [chatMessages, setChatMessages] = useState([])
    const [openCompose,setOpenCompose] = useState(false)

    useEffect(()=>{
        fetch(`/api/user/contacts`)
        .then(r=>r.json())
        .then(setContacts)
    },[])
    

    const contactsArray = contacts.map((contact,i)=><ContactCard key={i} contacts={contacts} receiver={receiver} contact={contact} user={user} setChatMessages={setChatMessages} setReceiver={setReceiver} />)
    

  return (
    <Container sx={{ p:'5rem', height:'100vh', mb:'5rem'}}>
      <Grid container spacing={10} sx={{px:"2rem"}}>
            <Grid xs={5} sx={{borderStyle: 'solid', display: "flex",justifyContent:'center', alignItems:'center', p:1}}>
                <Typography variant='h6' component='h6' sx={{flex:1, textAlign:'center', pl:"2rem"}}>{user.username}</Typography>
                <AddIcon onClick={()=>setOpenCompose(true)} sx={{cursor:"pointer",fontSize:'2rem', justifySelf:'end'}}/>
            </Grid>
            <Grid xs={7} sx={{borderStyle: 'solid',p:0}}>
                {receiver&&
                <Box sx={{p:1,pl:3, display:'flex', gap:2, alignItems:'center', cursor: 'pointer'}} onClick={()=>navigate(`/profile/${receiver.username}`)}>
                  <Avatar src={receiver.image_url} alt={receiver.username}></Avatar>
                  <Typography variant='h6' component='h6'>{receiver.username}</Typography>
                </Box>}
            </Grid>
            <Grid xs={5} sx={{borderStyle: 'solid', display: "flex", flexDirection:'column',overflowY:"scroll"}}>
                {contactsArray}
            </Grid>
            <Grid xs={7} sx={{borderStyle: 'solid'}}>                
                {receiver?<ChatBox user={user} receiver={receiver} messages={chatMessages}/>: <Typography>Start a Message</Typography>}       
            </Grid>
      </Grid>
      <CreateMessageModal setReceiver={setReceiver} contacts={contacts} setContacts={setContacts} openCompose={openCompose} setOpenCompose={setOpenCompose}/>
    </Container>
  );
}
export default DirectMessages;