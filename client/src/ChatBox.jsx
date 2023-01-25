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


const ChatBox = ({user, receiver}) => {

    const [messages, setMessages] = useState([])
    const [ws,setWs] = useState(null)
    const [inputMessage, setInputMessage] = useState("")

    useEffect(()=>{
        fetch(`/api/get_conversation`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({receiver_username:receiver.username, sender_username: user.username})
        })
        .then(r=>r.json())
        .then(setMessages)
    },[])

    useEffect(()=> {
        setWs(new WebSocket('ws://localhost:3000/api/cable'))
    },[])

    useEffect(()=> {
        if (ws) {
            ws.onopen = (event) => {
              console.log('WebSocket connection opened', event);
              
              ws.send(JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                    sender_username: user.username,
                    receiver_username: receiver.username,
                    channel: 'MessageChannel'
                })
              }))
            }

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "ping") return
                if (data.type === "welcome") return
                if (data.type === "confirm_subscription") return

                const message = data.message

                console.log('WebSocket message received', event);
                console.log(message)
                setMessages(prev=>[message, ...prev])
                // handle message here
            };

            ws.onclose = (event) => {
                console.log('WebSocket connection closed', event);
            };


        }
        return () => {
            if (ws) {
                ws.close();
            }
        }
        
    }, [ws])

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
            return <Typography key={i} sx={{alignSelf:'end'}}>{message.body}</Typography>
        }
        else {
            return <Typography key={i} sx={{alignSelf:'start'}}>{message.body}</Typography>
        }
        
    })


  return (
    <>
    <Box sx={{borderStyle: 'solid', height:500, display:"flex", flexDirection:"column-reverse", overflowY:"scroll"}}>
            {messagesArray}
    </Box>
    <Box>
        <form onSubmit={handleNewMessage}>
            <TextField value={inputMessage} onChange={(e)=>setInputMessage(e.target.value)}/><Button type="submit">Send</Button>
        </form>
    </Box>
    </>
    
  );
}
export default ChatBox;