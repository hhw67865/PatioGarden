import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import { useNavigate } from 'react-router-dom';
import ProblemCard from './ProblemCard';

const PestPage = ({userUpdate, setUserUpdate, user}) => {

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

      const filteredPlantPosts = plantPosts.filter((plant)=>plant.tags.filter(tag=>tag.name==="pests").length>0)

      if (plant)
  return (
    <Container sx={{p:'5rem',height:'100vh'}}>
      <Grid container spacing={10} sx={{px:"2rem"}}>
        <Grid xs={12} sx={{p:0}}>
          <Button onClick={()=>navigate(`/plants/${plantName}`)}>Go back to {plantName}</Button>
        </Grid>
        <Grid xs={5} sx={{p:0, pt:4}}>
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
            <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem"}}>Pests:</Typography>
            <Box sx={{mt:3,gap:2, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))'}}>
                {plant.pests.map((problem,i)=><ProblemCard key={i} problem={problem}/>)}    
            </Box>

        </Grid>
        <Grid xs={12}>
          <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem", textAlign:"center"}}>Pest Posts</Typography> <hr/>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {filteredPlantPosts.map((post,i)=><PostCard key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default PestPage;