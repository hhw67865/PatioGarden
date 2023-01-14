import { Modal } from "@mui/material";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";

const ProfileModal = ({openProfile, setOpenProfile, locations, user, setUserUpdate}) => {

    const [formData, setFormData] = useState({
        name: user?user.name?user.name:"":"",
        description: user?user.description?user.description:"":"",
        skill_level: user?user.skill_level?user.skill_level:"":"",
        location_id: user?user.location ? user.location.id:"":""
    })
    const [errors, setErrors] = useState(null)

    function handleForm (e) {
        setFormData({...formData,[e.target.name]:e.target.value})
        console.log(formData)
    }

    function submitForm (e) {
        e.preventDefault()
        fetch(`/api/users`, {
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData)
        })
        .then(r=>{
          if (r.ok) {
            r.json().then((obj)=>{
                setFormData({
                    name: obj.name,
                    description: obj.description,
                    skill_level: obj.skill_level,
                    location_id: obj.location.id
                })
                setErrors(null)
                setOpenProfile(false)
                setUserUpdate(prev=>!prev)
            })
            
          }
          else {
            r.json().then((obj)=>{
              setErrors(obj.errors)
            })
          }
        })
    }
    

    
    
  return (
    <>
        <Modal
            open={openProfile}
            onClose={()=>setOpenProfile(false)}            
        >
            <Box className="modal-box-update" sx={{height:'auto', bgcolor: 'background.paper',boxShadow: 24}}>
                <Typography sx={{pb:'3rem'}} className="modal-title" variant="h4" component="h4">
                    Profile
                </Typography>               
                <form className="modal-update" onSubmit={submitForm} >
                    <TextField
                        sx={{width:'100%'}}                   
                        label="Name"                                            
                        variant="standard"
                        name="name"                        
                        value={formData.name}
                        onChange={handleForm}                       
                    /><br/>
                    <TextField
                        multiline
                        maxRows={4}
                        sx={{width:'100%'}}                   
                        label="Description"                                            
                        variant="standard"
                        name="description"                        
                        value={formData.description}
                        onChange={handleForm}                       
                    /><br/>
                    <InputLabel id="skill-level">Skill Level</InputLabel> 
                    <Select
                        labelId="skill-level"
                        sx={{width:'30%'}}                                           
                        name="skill_level"
                        value={formData.skill_level}
                        onChange={handleForm}                      
                    >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select><br/>
                    <Autocomplete
                        disablePortal
                        options={locations}
                        getOptionLabel={(location => location.name)}                        
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Location" />}
                        onChange={(event, location) => {
                            setFormData({...formData,location_id: location.id});
                          }}
                    />
                    <Typography variant="body1" component="p">
                    Current Location: {user.location?user.location.name: "No Location"}
                    </Typography>
                    {errors?errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start"}} className="errors" variant="body2" component="p"> {error}</Typography>):<br/>}                   
                    <Button type="submit" variant="outlined" sx={{p:'rem', marginTop:'2rem', alignSelf:'end'}}>
                        Save Changes
                    </Button>                      
                </form>
            </Box>  
        </Modal>
    </>
  );
}
export default ProfileModal;