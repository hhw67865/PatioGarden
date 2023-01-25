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


const DirectMessages = ({user}) => {

    const [receiver, setReceiver] = useState(null)

    useEffect(()=>{
        fetch(`/api/users/steviehackett`)
        .then(r=>r.json())
        .then(setReceiver)
    },[])
    

  return (
    <Container sx={{borderStyle: 'solid', p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{borderStyle: 'solid', px:"2rem"}}>
            <Grid xs={4} sx={{borderStyle: 'solid', display: "flex"}}>
                <Typography>Username</Typography>
                <AddIcon/>
            </Grid>
            <Grid xs={8} sx={{borderStyle: 'solid'}}>
                <Typography>Other user</Typography>
            </Grid>
            <Grid xs={4} sx={{borderStyle: 'solid', display: "flex", flexDirection:'column'}}>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
                <Typography>List of users</Typography>
            </Grid>
            <Grid xs={8} sx={{borderStyle: 'solid'}}>                
                {receiver&&<ChatBox user={user} receiver={receiver}/>}            
            </Grid>
      </Grid>
    </Container>
  );
}
export default DirectMessages;