import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import PlantCard from './PlantCard';


const Plants = ({plants}) => {

  const plantArray = plants.map((plant,i)=><PlantCard key={i} plant={plant}/>)

  return (
    <Container sx={{height:'100vh'}}>
      <Typography sx={{textAlign: "center",m:5,fontWeight: 700,fontFamily: "open-sans", fontSize:"3rem", letterSpacing: '.3rem'}}>PLANTS</Typography> 
      <Grid container sx={{mt:'1rem'}} spacing={5}>
        <Grid xs={3} sx={{ height:'100vh'}}>
          Filters
        </Grid>
        <Grid xs={9} sx={{ height:'100vh'}}>
            <Box sx={{ width:"100%", display:'flex'}}>
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