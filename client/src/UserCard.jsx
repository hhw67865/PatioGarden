import { Avatar } from '@mui/material';
import Paper from '@mui/material/Paper';
import {Typography} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from 'react'

const UserCard = ({searchedUser,setSearch}) => {
  return (
    <Paper sx={{m:1, p:0, cursor:"pointer"}} onClick={()=>{setSearch(searchedUser.username)}}>
        <Grid container spacing={0} sx={{p:1, display:"flex",  justifyItems:"center", alignItems:"center"}}>
            <Grid xs="auto" sx={{p:0}}>
                <Avatar sx={{ width: 34, height: 34 }}  src={searchedUser.image_url} alt={searchedUser.username}></Avatar>
            </Grid>
            <Grid xs sx={{pl:1}}>
                <Typography>{searchedUser.username}</Typography>                
            </Grid>

        </Grid>
      
    </Paper>
  );
}
export default UserCard;