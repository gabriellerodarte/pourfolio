import React, { useEffect, useState} from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [userSpirits, setUserSpirits] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    console.log({
        user: user,
        spirits: userSpirits
    })

    useEffect(() => {
        fetch(`/check_session`)
        .then(r => {
            if (r.ok) return r.json()
            throw new Error('Failed to fetch session')
        })
        .then(userData => {
            console.log(userData)
            setUser({
                id: userData.id,
                username: userData.username
            })
            setUserSpirits(userData.spirits)
            setLoggedIn(true)
        })
        .catch(error => {
            console.error('Error fetching session: ', error)
            setUser(null)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, userSpirits, setUserSpirits, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }