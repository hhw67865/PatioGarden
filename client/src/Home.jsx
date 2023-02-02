import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Autocomplete} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Select} from '@mui/material';
import PlantCard from './PlantCard';


const Home = () => {

  let navigate = useNavigate()

  const [locations,setLocations] = useState([])
  const [location,setLocation] = useState({
    id: "",
    name: ""
  })
  const [months, setMonths] = useState([])
  const [month, setMonth] = useState({
    id: "",
    name: ""
  })
  const [filteredPlants, setFilteredPlants] = useState(null)
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
    if (!location.id) {
      setError("Location must be filled.")
      return
    }
    fetch(`/api/plants/filtered`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({location_id:location.id, month_id:month.id})
    })
    .then(r=>r.json())
    .then(setFilteredPlants)
  }

  


  return (
    <Container sx={{ p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{ px:"2rem"}}>
        <Grid xs={12} sx={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <img src="/Logo.png" alt="Logo" style={{width:"13rem", }} />
          <Typography sx={{flexShrink:0, fontWeight: 700,fontFamily: "open-sans", fontSize:"3rem", letterSpacing: '.3rem'}}>Welcome to PatioGarden</Typography>
        </Grid>
        <Grid xs={12} sx={{flexDirection:"column",flex:1, display:'flex', justifyContent:'center', alignItems:"center"}}>
          <Button onClick={()=>navigate("/plants")} variant='outlined'><Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem"}}>Search for a Plant!</Typography></Button>
          <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem", m:"2rem"}}>OR</Typography>
          <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"2rem"}}>Find out what you can grow!</Typography>
        </Grid>
        <Grid xs={12} sx={{py:0}}>
          <Box sx={{ minHeight:"300px", p:4}}>
            {!filteredPlants?
            <form onSubmit={handleSubmit}>
              <Typography sx={{fontWeight: 500,fontFamily: "open-sans", fontSize:"1.5rem",m:2}}>Where is your garden? *Currently only US locations*</Typography>
              <Autocomplete                
                disablePortal
                options={locations}
                getOptionLabel={(location => location.name)}                        
                sx={{ width: 300,m:2 }}
                renderInput={(params) => <TextField {...params} label="Location" />}
                onChange={(event, location) => {
                    setLocation(location?{id: location.id, name: location.name}:{
                      id: "",
                      name: ""
                    });
                  }}
              />
              <Typography sx={{fontWeight: 500,m:2,fontFamily: "open-sans", fontSize:"1.5rem"}}>What time do you plan to start?</Typography>
              <Select
                required
                id="demo-simple-select"
                value={month.id}                
                onChange={(e,l)=>setMonth({id: l.props.value, name: l.props.children})}
                sx={{width:'60%',m:2}}              >
                {months.map((month,i)=><MenuItem key={i} value={month.id}>{month.name}</MenuItem>)}                
              </Select> <br/>
              {error?<Typography className="errors" variant="body2" component="p">{error}</Typography>:<br/>}
              <Button type="submit" variant='contained' sx={{m:2}}>Start your garden!</Button>
            </form>:
            <>
              <Box sx={{width:"100%", display:'flex', flexDirection:"column"}}>
                <Button sx={{mb:7}} onClick={()=>{
                  setFilteredPlants(null)
                  setLocation({
                    id: "",
                    name: ""
                  })
                  setMonth({
                    id: "",
                    name: ""
                  })
                  }}><Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"1.5rem"}}>Change Month or Location</Typography></Button>
                <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"1.5rem"}}>Top picks for starting a garden in {location.name} during {month.name}!</Typography>
                <Typography sx={{fontWeight: 700,fontFamily: "open-sans", fontSize:"1rem"}}>Check out how others are doing with their plants!</Typography>              
              </Box>
              <Box sx={{mt:3,gap:2, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))'}}>
                {filteredPlants.map((plant,i)=><PlantCard key={i} plant={plant}/>)}             
              </Box>
            </>}        
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;