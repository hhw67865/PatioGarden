import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Plants from './Plants';
import Home from './Home';
import Community from './Community';
import Profile from './Profile';
import Account from './Account';
import NotFound from './NotFound';



function App() {
  
  const [user, setUser] = useState(null)
  const [usernames, setUsernames] = useState({})
  const [openSignup,setOpenSignup] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [openUsername,setOpenUsername] = useState(false)

  useEffect(()=>{
    fetch(`/api/usernames`)
    .then(r=>r.json())
    .then(obj=>setUsernames(obj.usernames))
  },[openSignup,openUsername])

  useEffect(()=>{
    fetch(`/api/authorized`)
    .then(r=>{
      if (r.ok) {
        r.json().then(setUser)
      }
    })
    
  },[userUpdate])


  return (
    <div className="App">
      <Navbar usernames={usernames} user={user} setUser={setUser} openSignup={openSignup} setOpenSignup={setOpenSignup}/>
      <Routes>
        <Route path="/plants" element={<Plants/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/profile/:username" element={<Profile user={user} userUpdate={userUpdate} setUserUpdate={setUserUpdate}/>} />
        {user?<Route path="/account" element={<Account usernames={usernames} setOpenUsername={setOpenUsername} openUsername={openUsername} setUserUpdate={setUserUpdate} user={user} setUser={setUser}/>} />:null}
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
