import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';

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
    </div>
  )
}

export default App
