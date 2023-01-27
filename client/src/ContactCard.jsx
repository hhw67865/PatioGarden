import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import {Typography} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from 'react'

const ContactCard = ({contact, user, setChatMessages, setReceiver, receiver, contacts}) => {

    const [messages, setMessages] = useState([])
    const [ws,setWs] = useState(null)

  
    
    useEffect(()=>{
        fetch(`/api/get_conversation`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({receiver_username:contact.username, sender_username: user.username})
        })
        .then(r=>r.json())
        .then(setMessages)
    },[contacts])

    useEffect(()=> {
        setWs(new WebSocket('ws://localhost:3000/api/cable'))
    },[contacts])

    useEffect(()=> {
        if (ws) {
            ws.onopen = (event) => {
            //   console.log('WebSocket connection opened', event);
              
              ws.send(JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                    sender_username: user.username,
                    receiver_username: contact.username,
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

                // console.log('WebSocket message received', event);
                // console.log(message)
                setMessages(prev=>[message, ...prev])
                
            };

            ws.onclose = (event) => {
                // console.log('WebSocket connection closed', event);
            };


        }
        return () => {
            if (ws) {
                ws.close();
            }
        }
        
    }, [ws, contacts])

    function handleChatBox () {
        setChatMessages(messages)
        setReceiver(contact)
    }

    function refreshMessages () {
        if (receiver) {
            if (receiver === contact) {
                setChatMessages(messages)
            }
        }
    }
    refreshMessages()

  return (
    <Paper sx={{m:1, p:0, cursor:'pointer'}} onClick={handleChatBox}>
        <Grid container spacing={0} sx={{p:1}}>
            <Grid xs="auto" sx={{p:0,display:"flex",  justifyItems:"center", alignItems:"center"}}>
                <Avatar src={contact.image_url} alt={contact.username}></Avatar>
            </Grid>
            <Grid xs sx={{ display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"start", p:1,height:60, overflow:"hidden"}}>
                <Typography>{contact.username}</Typography>
                {messages[0]&&<Typography variant='caption' sx={{whiteSpace: "nowrap",textOverflow:'ellipsis'}}>{messages[0].body}</Typography>}
            </Grid>

        </Grid>
      
    </Paper>
  );
}
export default ContactCard;