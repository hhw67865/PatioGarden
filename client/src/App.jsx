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



function App() {
  
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch(`/api/authorized`)
    .then(r=>{
      if (r.ok) {
        r.json().then(setUser)
      }
    })
    
  },[])

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/plants" element={<Plants/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App
