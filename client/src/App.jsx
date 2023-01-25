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
import CarePage from './CarePage';
import ProblemPage from './ProblemPage';
import PestPage from './PestPage';
import MessageButton from './MessageButton';
import DirectMessages from './DirectMessages';




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
          <Route path="care" element={<CarePage  userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user}/>}/>
          <Route path="problems" element={<ProblemPage  userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user}/>}/>
          <Route path="pests" element={<PestPage/>}/>
        </Route>
        <Route path="/community" element={<Community user={user} userUpdate={userUpdate} setUserUpdate={setUserUpdate}/>} />
        <Route path="/profile/:username" element={<Profile user={user} userUpdate={userUpdate} setUserUpdate={setUserUpdate}/>} />
        {user?<Route path="/account" element={<Account usernames={usernames} setOpenUsername={setOpenUsername} openUsername={openUsername} userUpdate={userUpdate} setUserUpdate={setUserUpdate} user={user} setUser={setUser}/>} />:null}
        {user&&<Route path='/directmessages' element={<DirectMessages user={user}/>}/>}
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <MessageButton/>
    </div>
  )
}

export default App
