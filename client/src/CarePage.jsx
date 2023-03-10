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

const CarePage = ({userUpdate, setUserUpdate, user}) => {

    let navigate = useNavigate()

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
      },[plantName])
  
      useEffect(()=>{
        fetch(`/api/plants/${plantName}/posts`)
        .then(r=>{
          if (r.ok) {
            r.json().then(setPlantPosts)
          }
        })
      },[userUpdate, plantName])

      const filteredPlantPosts = plantPosts.filter((plant)=>plant.tags.filter(tag=>tag.name==="care").length>0)

      if (plant)
  return (
    
    <Container sx={{p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{ px:"2rem"}}>
        <Grid xs={12} sx={{ p:0}}>
          <Button onClick={()=>navigate(`/plants/${plantName}`)}>Go back to {plantName}</Button>
        </Grid>
        <Grid xs={5} sx={{ p:0, pt:4}}>
            <img style={{objectFit:"cover", width:"100%"}}  src={plant.image_url} alt={plant.name} />
        </Grid>
        <Grid xs={7}>
            <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem"}}>{plant.name}</Typography>
            <Typography variant="h6" component='h6'>Description:</Typography>
            <Typography variant="body2" component='p' sx={{pb:"1rem"}}>{plant.description}</Typography>
            <Typography variant="h6" component='h6'>Growable Months:</Typography>
            <Typography variant="body2" component='p' sx={{pb:"1rem"}} >{plant.months.map((month)=>`${month.name} `)}</Typography>
            <Typography variant="h6" component='h6'>Growable Locations:</Typography>
            <Typography variant="body2" component='p' >{plant.locations.map((location)=>`${location.name} `)}</Typography>
        </Grid>
        <Grid xs={12}>
            <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem"}}>Care:</Typography>
            <Typography variant="body2" component='p' sx={{pb:"1rem"}}>{plant.care}</Typography>
        </Grid>
        <Grid xs={12}>
          <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem", textAlign:"center"}}>Care Posts</Typography> <hr/>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {filteredPlantPosts.map((post,i)=><PostCard key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>
      </Grid>
    </Container>
    
  );
}
export default CarePage;