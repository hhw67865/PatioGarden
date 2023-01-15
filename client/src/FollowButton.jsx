import { Button } from "@mui/material";
import { useState } from "react";


const FollowButton = ({user, profileUser, setUserUpdate}) => {

    const [follow, setFollow] = useState(user.following.filter((following)=>following.id===profileUser.id).length>0)

    function handleFollow () {
        fetch(`/api/follows`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({followed_id: profileUser.id})
        })
        .then(r=>{
          if (r.ok) {
            setFollow(true) 
            setUserUpdate(prev=>!prev)          
          }          
        })
    }

    function handleUnfollow () {
        fetch(`/api/unfollow`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({followed_id: profileUser.id})
        })
        .then(r=>{
          if (r.ok) {
            setFollow(false)
            setUserUpdate(prev=>!prev)             
          } 
        })
    }


  return (
    <>
        {follow?
        <Button onClick={handleUnfollow} variant="outlined" sx={{mt:'50px'}}>Following</Button>
        :
        <Button onClick={handleFollow} variant="contained" sx={{mt:'50px'}}>Follow</Button>}
    </>
  );
}
export default FollowButton;