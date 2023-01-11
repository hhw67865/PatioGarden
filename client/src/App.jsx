import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  
  fetch(`/api/users`)
  .then(r=>r.json())
  .then(console.log)

  return (
    <div className="App">
      
    </div>
  )
}

export default App
