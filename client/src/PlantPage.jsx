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


const PlantPage = ({userUpdate, setUserUpdate, user}) => {

    const { plantName } = useParams()
    const [plant, setPlant] = useState(null)
    const [plantPosts, setPlantPosts] = useState([])


    useEffect(()=>{
      fetch(`/api/plants/${plantName}`)
      .then(r=>{
        if (r.ok) {
          r.json().then(setPlant)
        }
      })
    },[])

    useEffect(()=>{
      fetch(`/api/plants/${plantName}/posts`)
      .then(r=>{
        if (r.ok) {
          r.json().then(setPlantPosts)
        }
      })
    },[userUpdate])

    if (plant)
  return (
    <Container sx={{p:'5rem',borderStyle:'solid', height:'100vh'}}>
      <Grid container spacing={10} sx={{borderStyle:'solid'}}>
        <Grid xs={5} sx={{borderStyle:'solid'}}>
            PLANT PICTURE
        </Grid>
        <Grid xs={7} sx={{borderStyle:'solid'}}>
            <Typography>{plant.name}</Typography>
            <Typography>{plant.description}</Typography>
            <Typography>{plant.months.map((month)=>month.name)}</Typography>
            <Typography>{plant.locations.map((location)=>location.name)}</Typography>
        </Grid>
        <Grid xs={12} sx={{borderStyle:'solid'}}>
          CARE
        </Grid>
        <Grid xs={12} sx={{borderStyle:'solid'}}>
          Common Problems
        </Grid>
        <Grid xs={12} sx={{borderStyle:'solid'}}>
          Pests
        </Grid>
        <Grid xs={12} sx={{borderStyle:'solid'}}>
          <PostCreation/>
        </Grid>
        <Grid xs={12} sx={{borderStyle:'solid'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {plantPosts.map((post,i)=><PostCard  key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default PlantPage;