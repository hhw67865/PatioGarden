import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import Comments from './Comments';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DeleteIcon from '@mui/icons-material/Delete';
import PlantCard from './PlantCard';


const PostCard = ({post, user, setUserUpdate, userUpdate}) => {

    let navigate = useNavigate();

    function handleNavToUser () {
      navigate(`/profile/${post.user.username}`)
    }

    const [showComments, setShowComments] = useState(false)

    const [imageNumber, setImageNumber] = useState(0)


    function handleBefore () {
      setImageNumber(prev=>{
        if (prev===0) {
          return post.pictures.length-1
        }
        else {
          return prev-1
        }
      })
    }

    function handleAfter () {
      setImageNumber(prev=>{
        if (prev===post.pictures.length-1) {
          return 0
        }
        else {
          return prev+1
        }
      })
    }

    function handleDelete() {
      fetch(`/api/posts/${post.id}`, {
        method: "DELETE"
      })
      .then(()=>setUserUpdate(prev=>!prev))
    }

    

  return (
    <Paper className="post-card" sx={{my:"1rem", py:"1rem"}}>
      <Grid container>
        <Grid sx={{p:0,display:'flex',alignItems:'center'}} xs={2}><Avatar onClick={handleNavToUser} alt={post.user.username} src={post.user.image_url} sx={{ width: 56, height: 56, m: '1rem',cursor:'pointer' }}></Avatar></Grid>
        <Grid sx={{ p:1}} xs={7}>
            <Typography onClick={handleNavToUser} sx={{cursor:'pointer'}}>{post.user.username} is growing {post.plant.name}</Typography>
            <Typography>{post.user.skill_level}</Typography>
            <Typography variant="caption">{post.created_at_ago}</Typography>
        </Grid>
        <Grid sx={{p:1, display:'flex',flexDirection:"column", alignItems:'end', pr:"2rem" }} xs={3}>         
          {user&&user.id===post.user.id&&<IconButton onClick={handleDelete} ><DeleteIcon fontSize="inherit" /></IconButton>}
          <Avatar sx={{cursor:'pointer'}} onClick={()=>{navigate(`/plants/${post.plant.name}`)}} src={post.plant.image_url}/>
        </Grid>
        <Grid sx={{p:1}} xs={12}>{post.tags.map((tag,i)=><Chip key={i} label={tag.name.toUpperCase()}/>)}</Grid>
        <Grid sx={{p:1}} xs={12}>{post.title}</Grid>
        <Grid sx={{p:1, maxHeight: "350px", display:"flex", justifyContent:"center", alignItems:"center"}} xs={12}>
          {post.pictures&&
          <>
            {post.pictures.length>1&&<IconButton onClick={handleBefore} size="small"><NavigateBeforeIcon/></IconButton>}
            <div style={{flex:1, display:'flex',justifyContent:"center", alignItems:"center"}}>
              <img style={{objectFit:"cover", height:"300px", maxWidth:"85%"}} src={post.pictures[imageNumber]} alt={post.title} />
            </div>
            {post.pictures.length>1&&<IconButton onClick={handleAfter} size="small"><NavigateNextIcon/></IconButton>}
          </> 
          }
        </Grid>
        <Grid sx={{p:1}} xs={12}>{post.post_body}</Grid>
        <Grid sx={{p:1}} xs={9}>These people liked this post</Grid>
        <Grid sx={{p:1}} xs={3}><Typography sx={{cursor:"pointer"}} onClick={()=>setShowComments(!showComments)}>{post.comments.length} {post.comments.length===1? "Comment":"Comments"}</Typography></Grid>
        <Grid sx={{p:0, display:"flex", justifyContent:"center", alignItems:"center"}} xs={6}><Button>Like</Button></Grid>
        <Grid sx={{p:0, display:"flex", justifyContent:"center", alignItems:"center"}} xs={6}><Button onClick={()=>setShowComments(!showComments)}>Comment</Button></Grid>
        {showComments && <Grid sx={{p:0}} xs={12}><Comments setShowComments={setShowComments} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}></Comments></Grid>}
      </Grid>
    </Paper>
  );
}
export default PostCard;