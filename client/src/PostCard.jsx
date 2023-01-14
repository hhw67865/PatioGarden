import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import Comments from './Comments';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

const PostCard = ({post, user, setUserUpdate, userUpdate}) => {

    const [showComments, setShowComments] = useState(false)

  return (
    <Paper className="post-card" sx={{my:"1rem"}}>
      <Grid container>
        <Grid sx={{p:0,display:'flex',alignItems:'center'}} xs={2}><Avatar sx={{ width: 56, height: 56, m: '1rem' }}></Avatar></Grid>
        <Grid sx={{ p:1 }} xs={8}>
            <Typography>{post.user.username}</Typography>
            <Typography>{post.user.skill_level}</Typography>
            <Typography>{post.created_at_ago}</Typography>
        </Grid>
        <Grid sx={{p:1}} xs={2}>{post.plant.name}</Grid>
        <Grid sx={{p:1}} xs={12}>{post.tags.map((tag,i)=><Chip key={i} label={tag.name.toUpperCase()}/>)}</Grid>
        <Grid sx={{p:1}} xs={12}>{post.title}</Grid>
        <Grid sx={{p:1}} xs={12}>Images</Grid>
        <Grid sx={{p:1}} xs={12}>{post.post_body}</Grid>
        <Grid sx={{p:1}} xs={9}>These people liked this post</Grid>
        <Grid sx={{p:1}} xs={3}><Typography sx={{cursor:"pointer"}} onClick={()=>setShowComments(!showComments)}>{post.comments.length} {post.comments.length===1? "Comment":"Comments"}</Typography></Grid>
        <Grid sx={{p:0}} xs={6}><Button>Like</Button></Grid>
        <Grid sx={{p:0}} xs={6}><Button onClick={()=>setShowComments(!showComments)}>Comment</Button></Grid>
        {showComments && <Grid sx={{p:0}} xs={12}><Comments userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} post={post}></Comments></Grid>}
      </Grid>
    </Paper>
  );
}
export default PostCard;