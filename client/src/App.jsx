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
import PlantPage from './PlantPage';





function App() {
  
  const [user, setUser] = useState(null)
  const [usernames, setUsernames] = useState({})
  const [openSignup,setOpenSignup] = useState(false)
  const [userUpdate, setUserUpdate] = useState(false)
  const [openUsername,setOpenUsername] = useState(false)
  const [plants, setPlants] = useState([])

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

  useEffect(()=>{
    fetch(`/api/plants`)
    .then(r=>r.json())
    .then(setPlants)
  },[])


  return (
    <div className="App">
      <Navbar usernames={usernames} user={user} setUser={setUser} openSignup={openSignup} setOpenSignup={setOpenSignup}/>
      <Routes>
        <Route path="/plants" element={<Plants plants={plants}/>} />
        <Route path="/plants/:plantName">
          <Route index element={<PlantPage userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user}/>}/>          
          <Route path="care" element={<div>Care</div>}/>
          <Route path="problems" element={<div>Care</div>}/>
          <Route path="pests" element={<div>Care</div>}/>
        </Route>
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
