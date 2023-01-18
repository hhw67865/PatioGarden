import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Avatar} from '@mui/material';
import { Modal } from "@mui/material";
import Chip from '@mui/material/Chip';


const PostCreation = ({setUserUpdate, openCreation, setOpenCreation, user, plant}) => {

  const [tags, setTags] = useState([])

  const [formats, setFormats] = useState([])
  const [title, setTitle] = useState("")
  const [post, setPost] = useState("")
  const [errors, setErrors] = useState(null)
  const [pictures, setPictures] = useState(null)
  
  
  useEffect(()=>{
    fetch("/api/tags")
    .then(r=>r.json())
    .then(setTags)
  },[])

  function handleSubmit (e) {
    e.preventDefault()

    if (formats.length===0) {
      setErrors(["Post must have at least one tag"])
      return
    }

    const data = new FormData()

    if (pictures){
    for (let i = 0; i < pictures.length; i++) {
      data.append("pictures[]", pictures[i]);
    }
    }
    data.append("title", title)
    data.append("post_body", post)
    data.append("user_id", user.id)
    data.append("plant_id", plant?plant.id:null)

    fetch(`/api/posts`, {
      method: "POST",
      body: data
    })
    .then(r=>{
      if (r.ok) {
        r.json().then((newPost)=>{
                    
          formats.forEach((tag)=>{

            fetch(`/api/post_tags`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({post_id: newPost.id, tag_id: tag})
            })            
          })
        })
        .then(()=>{
          setFormats([])
          setErrors(null)
          setTitle("")
          setPost("")
          setPictures(null)
          setOpenCreation(false)
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
    <Modal
      open={openCreation}
      onClose={()=>setOpenCreation(false)}            
    >
      <Box className="modal-box-update" sx={{height:'auto', bgcolor: 'background.paper',boxShadow: 24}}>
        <Typography variant="h5" component="h5" sx={{textAlign:"center",mb:4, fontWeight:"500"}}> Create Post </Typography>
        <hr/>
        <div style={{display:"flex", alignItems:'center', gap:"1rem", marginTop:10,marginBottom:30, width:'100%'}}>
          <Avatar alt={user.username} src={user.image_url}></Avatar>
          <Typography sx={{flex:1}}>{user.username}</Typography>
          {plant&&<Chip sx={{alignSelf:'end, center', mr:"1rem"}} color="success" label={plant.name.toUpperCase()}/>}
        </div>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection: 'column', gap:"1rem"}}>
          
          <TextField value={title} onChange={(e)=>{setTitle(e.target.value)}} label="Title"/>
          <ToggleButtonGroup
          value={formats}
          onChange={(event, newFormats)=> setFormats(newFormats)}   
            
          > 
          
            {tags.map((tag,i)=><ToggleButton key={i} value={tag.id}>{tag.name}</ToggleButton>)}
            
          </ToggleButtonGroup>
          <input multiple type='file' name="pictures" onChange={(e)=>setPictures(e.target.files)}/>
          <TextField sx={{my:"1rem"}} multiline rows={6} placeholder="What do you want to post?" value={post} onChange={(e)=>{setPost(e.target.value)}}/>
          <Button type="submit" variant='outlined'>Post</Button>
          {errors?errors.map((error,i)=><Typography key={i} sx={{alignSelf:"start"}} className="errors" variant="body2" component="p"> {error}</Typography>):<br/>} 
        </form>
      </Box>
    </Modal>
  );
}
export default PostCreation;