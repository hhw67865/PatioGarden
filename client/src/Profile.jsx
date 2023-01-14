
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

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 150,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Profile = ({user, setUserUpdate, userUpdate}) => {

  const { username } = useParams()
  const [profileUser, setProfileUser] = useState(null)
  const [profilePosts, setProfilePosts] = useState([])
  

  useEffect(()=> {
    fetch(`/api/users/${username}`)
    .then(r=>{
      if (r.ok) {
        r.json().then(setProfileUser)
      }
      
    })
  },[userUpdate])

  useEffect(()=>{
    fetch(`/api/users/${username}/posts`)
    .then(r=>r.json())
    .then(setProfilePosts)
  },[userUpdate])

  if(!profileUser) {
    return (
      <div>
        User does not Exist
      </div>
    )
  }
  return (
    <Container sx={{ p:'5rem', backgroundColor: '#D3D3D3'}}>
      <Grid container spacing={10} >
        <Grid xs={5} className="profile-area-1" >
          <Typography sx={{pb:'30px'}}>
            {profileUser.username}
          </Typography>
          <Avatar sx={{ width: 200, height: 200 }}></Avatar>
          <Button variant="contained" sx={{mt:'50px'}}> Follow </Button>
        </Grid>
        <Grid className="profile-area-2" xs={7} >
          <Grid className="posts-followers-following" container spacing={10}>
            <Grid xs={4}>
              <Typography sx={{fontWeight:'500'}}>{profileUser.posts.length}</Typography>
              <Typography>Posts</Typography>              
            </Grid>
            <Grid xs={4}>
              <Typography sx={{fontWeight:'500'}}>{profileUser.followers.length}</Typography>
              <Typography>Followers</Typography>              
            </Grid>
            <Grid xs={4}>
              <Typography sx={{fontWeight:'500'}}>{profileUser.following.length}</Typography>
              <Typography>Following</Typography>              
            </Grid>
          </Grid>
          <Typography>{profileUser.name}</Typography>
          <Typography sx={{my:'1rem'}}><strong>{profileUser.skill_level}</strong> Gardener</Typography>
          <Typography sx={{my:'2rem'}}>{profileUser.description}</Typography>
        </Grid>
        <Grid className="profile-area-3" xs={12} sx={{ mt:'60px', textAlign: "center"}}>
          {profileUser.username}'s Garden
          <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 200, width: '100%',justifyContent:'center', alignItems:'center' }}>
            {profileUser.plants.map((plant)=>(
              <ImageButton
              focusRipple
              key={plant.name}
              style={{
                width: 150,
                margin:"10px"
              }}>
                <ImageSrc style={{background: "url(https://howtodrawforkids.com/wp-content/uploads/2022/01/how-to-draw-a-tomato.jpg) no-repeat center/contain" }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {plant.name}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
                
              </ImageButton>             
            
            ))}
          </Box>
        </Grid>
        <Grid className="profile-area-4" xs={12} sx={{ mt:'60px'}}>
          Recent Posts
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center' }}>
            {profilePosts.map((post,i)=><PostCard  key={i} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}/>)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Profile;