import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import PostCreation from './PostCreation';
import {TextField} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



const Community = ({user, userUpdate, setUserUpdate}) => {

  const [posts, setPosts] = useState([])
  const [openCreation, setOpenCreation] = useState(false)
  const [showFollow, setShowFollow] = useState(false)

  useEffect(()=>{
    fetch(`/api/posts`)
    .then(r=>r.json())
    .then(setPosts)
  },[userUpdate])

  const filteredPosts = posts.filter((post)=> {
    if (!showFollow) {
      return true
    }
    return user.id===post.user.id? true : user.following.some((followed)=>followed.id===post.user.id)
  })

  return (
    <Container sx={{p:'5rem', height:'100vh'}}>
      <Grid container spacing={10} sx={{ px:"2rem"}}>
        {user&&<Grid xs={12} sx={{display:'flex', justifyContent:'center',alignItems:"center" }}>
          <Box sx={{display:'flex', justifyContent:'center',alignItems:"center", gap:2, width:"80%"}}>
            <Avatar alt={user.username} src={user.image_url}></Avatar> <TextField sx={{flex:1}} onClick={()=>setOpenCreation(true)} placeholder={`Got something to share, ${user.username}?`}></TextField>
            <PostCreation setUserUpdate={setUserUpdate} user={user} openCreation={openCreation} setOpenCreation={setOpenCreation}/>
          </Box>
        </Grid>}
        <Grid xs={12} >
        <Typography variant='h4' component='h4' sx={{fontWeight:"500", pb:"2rem", textAlign:"center"}}>Most Recent Posts</Typography> <hr/>
          {user&&<FormControlLabel control={<Checkbox checked={showFollow} onChange={(e)=>{setShowFollow(e.target.checked);setUserUpdate(prev=>!prev)}} />} label="Show only people I follow" />}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {filteredPosts.map((post,i)=><PostCard key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
export default Community;