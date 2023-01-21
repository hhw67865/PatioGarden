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
import PlantCard from './PlantCard';


const Plants = ({plants}) => {

  const plantArray = plants.map((plant,i)=><PlantCard key={i} plant={plant}/>)

  return (
    <Container sx={{height:'100vh', borderStyle:"solid"}}>
      <Typography>PLANTS</Typography> 
      <Grid container sx={{mt:'1rem'}} spacing={5}>
        <Grid xs={3} sx={{borderStyle:"solid", height:'100vh'}}>
          Filter
        </Grid>
        <Grid xs={9} sx={{borderStyle:"solid", height:'100vh'}}>
            <Box sx={{borderStyle:"solid", width:"100%", display:'flex'}}>
              <Typography>{plantArray.length} plants to grow!</Typography>              
            </Box>
            <Box sx={{mt:3,gap:2, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))'}}>
              {plantArray}             
            </Box>
        </Grid>

      </Grid>
    </Container>
    
  );
}
export default Plants;