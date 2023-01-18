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

const PlantPage = ({userUpdate, setUserUpdate, user}) => {

  let navigate = useNavigate()

    const { plantName } = useParams()
    const [plant, setPlant] = useState(null)
    const [plantPosts, setPlantPosts] = useState([])
    const [openCreation, setOpenCreation] = useState(false)


    useEffect(()=>{
      fetch(`/api/plants/${plantName}`)
      .then(r=>{
        if (r.ok) {
          r.json().then(setPlant)
        }
      })
    },[plantName])

    useEffect(()=>{
      fetch(`/api/plants/${plantName}/posts`)
      .then(r=>{
        if (r.ok) {
          r.json().then(setPlantPosts)
        }
      })
    },[userUpdate, plantName])

    if (plant)
  return (
    <Container sx={{p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{ px:"2rem"}}>
        <Grid xs={5} sx={{ p:0, pt:4}}>
            <img style={{objectFit:"cover", width:"100%"}}  src={plant.image_url} alt={plant.name} />
        </Grid>
        <Grid xs={7} >
            <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem"}}>{plant.name}</Typography>
            <Typography variant="h6" component='h6'>Description:</Typography>
            <Typography variant="body2" component='p' sx={{pb:"1rem"}}>{plant.description}</Typography>
            <Typography variant="h6" component='h6'>Growable Months:</Typography>
            <Typography variant="body2" component='p' sx={{pb:"1rem"}} >{plant.months.map((month)=>`${month.name} `)}</Typography>
            <Typography variant="h6" component='h6'>Growable Locations:</Typography>
            <Typography variant="body2" component='p' >{plant.locations.map((location)=>`${location.name} `)}</Typography>
        </Grid>
        <Grid xs={4} sx={{ display:"flex", justifyContent:'center', alignItems:"center"}}>
          <Button onClick={()=>navigate(`/plants/${plantName}/care`)} variant="contained" sx={{width:'100%', height:'100%',p:"1rem"}}><FavoriteIcon sx={{mr:"1rem"}}/>Care</Button>
        </Grid>
        <Grid xs={4} sx={{ display:"flex", justifyContent:'center', alignItems:"center"}}>
          <Button onClick={()=>navigate(`/plants/${plantName}/problems`)} variant="contained" sx={{width:'100%', height:'100%',p:"1rem"}}><ReportProblemIcon />Common Problems</Button>
        </Grid>
        <Grid xs={4} sx={{ display:"flex", justifyContent:'center', alignItems:"center"}}>
          <Button onClick={()=>navigate(`/plants/${plantName}/pests`)} variant="contained" sx={{width:'100%', height:'100%',p:"1rem"}}><PestControlIcon sx={{mr:"1rem"}}/>Pests</Button>
        </Grid>
        {user&&<Grid xs={12} sx={{display:'flex', justifyContent:'center',alignItems:"center" }}>
          <Box sx={{display:'flex', justifyContent:'center',alignItems:"center", gap:2, width:"80%"}}>
            <Avatar alt={user.username} src={user.image_url}></Avatar> <TextField sx={{flex:1}} onClick={()=>setOpenCreation(true)} placeholder={`Got something to share, ${user.username}?`}></TextField>
            <PostCreation setUserUpdate={setUserUpdate} plant={plant} user={user} openCreation={openCreation} setOpenCreation={setOpenCreation}/>
          </Box>
        </Grid>}
        <Grid xs={12} >
        <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem", textAlign:"center"}}>{plant.name} Posts</Typography> <hr/>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {plantPosts.map((post,i)=><PostCard key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default PlantPage;