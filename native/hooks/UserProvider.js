import React from 'react'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{
        user,
        setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default function useUser() {
    return useContext(UserContext);
}

