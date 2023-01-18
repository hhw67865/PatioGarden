import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react'
import {Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import {TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';




const Comments = ({post, user,setUserUpdate, userUpdate, setShowComments}) => {

    let navigate = useNavigate();

    const [comments, setComments] = useState(null)
    const [newComment, setNewComment] = useState("")
    const [errors, setErrors] = useState(null)

    useEffect(()=>{
        fetch(`/api/posts/${post.id}/comments`)
        .then(r=>r.json())
        .then(setComments)
    },[userUpdate])

    function handleNewComment (e) {
        e.preventDefault()
        fetch(`/api/comments`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({comment_body:newComment,post_id: post.id,user_id: user.id})
        })
        .then(r=>{
          if (r.ok) {
            setUserUpdate(!userUpdate)
            setNewComment("")
            setErrors(null)
          }
          else {
            r.json().then((obj)=>{
              setErrors(obj.errors)
            })
          }
        })
    }

  if (!comments) {
    return null
  }
  return (
    <>
        <Grid container spacing={2} sx={{p:2}}>
            <Grid sx={{display:'flex',alignItems:'center', justifyContent:'center'}} xs={1}><Avatar alt={user.username} src={user.image_url}></Avatar></Grid>
            <Grid xs={11} >
                <form onSubmit={handleNewComment} sx={{display:'flex'}}>
                    <TextField value={newComment} onChange={e=>setNewComment(e.target.value)} size='small' sx={{width:'85%'}} placeholder="Make a comment" variant="outlined" />
                    <Button type='submit' sx={{width:'13%'}}><SendIcon/></Button>
                </form>
            </Grid>
            {errors&&errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start"}} className="errors" variant="body2" component="p">{error}</Typography>)}
        </Grid>
    
        {comments.map((comment,i)=>
            <Grid key={i} container spacing={2} sx={{px:2,py:0}}>
                <Grid sx={{display:'flex',alignItems:'center',cursor:'pointer', justifyContent:'center'}} xs={1}><Avatar onClick={()=>{navigate(`/profile/${comment.user.username}`);setShowComments(false)}} alt={comment.user.username} src={comment.user.image_url}></Avatar></Grid>
                <Grid xs={11} sx={{display:'flex'}} >
                    <Paper sx={{minWidth:'50%', p:1}}>
                        <div style={{display:'flex', gap:10}}>
                            <Typography onClick={()=>{navigate(`/profile/${comment.user.username}`); setShowComments(false)}} sx={{flex:1,cursor:'pointer'}}>
                                {comment.user.username}
                            </Typography>
                            <Typography variant="caption" sx={{alignSelf:'end'}}>
                                {comment.created_at_ago}
                            </Typography>
                        </div>
                        <Typography>
                            {comment.comment_body}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )}
    </>
    
  );
}
export default Comments;