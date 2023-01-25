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
import SendIcon from '@mui/icons-material/Send';


const ChatBox = ({user,receiver, messages}) => {
    
    const [inputMessage, setInputMessage] = useState("")


    function handleNewMessage (e) {
        e.preventDefault()
        fetch(`/api/messages`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({receiver_username: receiver.username, sender_username: user.username,body:inputMessage})
        })
        .then(()=>setInputMessage(""))
    }


    const messagesArray = messages.map((message,i)=>{
        if (message.sender.username===user.username) {
            return <Typography className="message" key={i} sx={{alignSelf:'end', backgroundColor: '#ADD8E6',mr:2, ml:5, my:.5}}>{message.body}</Typography>
        }
        else {
            return <Typography className="message" key={i} sx={{alignSelf:'start', backgroundColor: '#f1f0f0', ml:2, mr:5, my:.5}}>{message.body}</Typography>
        }
    })


  return (
    <>
    <Box sx={{height:400, display:"flex", flexDirection:"column-reverse", overflowY:"scroll"}}>
        {messagesArray}
    </Box>
    <Box sx={{p:2}}>
        <form onSubmit={handleNewMessage}>
            <Grid container sx={{p:0,mt:3}}>
                <Grid xs sx={{p:0, ml:4}}>
                    <TextField size='small' sx={{width:'100%'}} value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)}/>
                </Grid> 
                <Grid xs="auto" sx={{p:0}}>
                    <Button type="submit"><SendIcon/></Button>    
                </Grid>                
            </Grid>
        </form>
    </Box>
    </>
    
  );
}
export default ChatBox;