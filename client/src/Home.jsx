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
import {Autocomplete} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Select} from '@mui/material';


const Home = () => {

  const [locations,setLocations] = useState([])
  const [location,setLocation] = useState("")
  const [months, setMonths] = useState([])
  const [month, setMonth] = useState("")
  const [filteredPlants, setFilteredPlants] = useState([])
  const [error, setError] = useState("")

  useEffect(()=>{
    fetch(`/api/locations`)
    .then(r=>r.json())
    .then(setLocations)

    fetch(`/api/months`)
    .then(r=>r.json())
    .then(setMonths)
  },[])

  function handleSubmit (e) {
    e.preventDefault()
    if (!location) {
      setError("Location must be filled.")
      return
    }
    fetch(`/api/plants/filtered`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({location_id:location, month_id:month})
    })
    .then(r=>r.json())
    .then(setFilteredPlants)
  }

  return (
    <Container sx={{borderStyle:'solid', p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{borderStyle:'solid', px:"2rem"}}>
        <Grid xs={12} sx={{borderStyle:'solid',display:'flex', justifyContent:'center', alignItems:"center"}}>
          <img src="/Logo.png" alt="Logo" style={{width:"13rem", }} />
          <Typography sx={{borderStyle:'solid',flexShrink:0, fontWeight: 700,fontFamily: "open-sans", fontSize:"3rem", letterSpacing: '.3rem',}}>Welcome to PatioGarden</Typography>
        </Grid>
        <Grid xs={12} sx={{flexDirection:"column",flex:1, display:'flex', justifyContent:'center', alignItems:"center"}}>
          <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem"}}>Search for a Plant!</Typography>
          <TextField sx={{width: '60%'}} id="outlined-basic" size="large" variant="outlined" placeholder='What are we growing?' />
          <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem", m:"4rem"}}>OR</Typography>
          <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem"}}>Find out what you can grow!</Typography>
        </Grid>
        <Grid xs={12} sx={{py:0}}>
          <Box sx={{borderStyle:'solid', minHeight:"300px", p:4}}>
            <form onSubmit={handleSubmit}>
              <Typography sx={{fontWeight: 500,fontFamily: "open-sans", fontSize:"1.5rem",m:2}}>Where is your garden? *Currently only US locations*</Typography>
              <Autocomplete                
                disablePortal
                options={locations}
                getOptionLabel={(location => location.name)}                        
                sx={{ width: 300,m:2 }}
                renderInput={(params) => <TextField {...params} label="Location" />}
                onChange={(event, location) => {
                    setLocation(location&&location.id);
                  }}
              />
              <Typography sx={{fontWeight: 500,m:2,fontFamily: "open-sans", fontSize:"1.5rem"}}>What time do you plan to start?</Typography>
              <Select
                required                
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Month"
                onChange={(e)=>setMonth(e.target.value)}
                sx={{width:'60%',m:2}}
              >
                {months.map((month,i)=><MenuItem key={i} value={month.id}>{month.name}</MenuItem>)}                
              </Select> <br/>
              {error?<Typography className="errors" variant="body2" component="p">{error}</Typography>:<br/>}
              <Button type="submit" variant='contained' sx={{m:2}}>Check Plants</Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;