import React from 'react'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [update, setUpdate] = useState(null)

    function refresh () {
      setUpdate(prev=>!prev)
    }

  return (
    <UserContext.Provider value={{
        user,
        setUser,
        refresh,
        update
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser() {
    return useContext(UserContext);
}

