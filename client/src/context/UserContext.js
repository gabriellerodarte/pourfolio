import React, { useEffect, useState} from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`/check_session`)
        .then(r => {
            if (r.ok) return r.json()
            throw new Error('Failed to fetch session')
        })
        .then(userData => setUser(userData))
        .catch(error => {
            console.error('Error fetching session: ', error)
            setUser(null)
        })
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }