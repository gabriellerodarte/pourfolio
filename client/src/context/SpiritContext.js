import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const SpiritContext = React.createContext()

function SpiritProvider({children}) {
    const { user, loggedIn } = useContext(UserContext)
    const [spirits, setSpirits] = useState([])

    useEffect(() => {
        if (loggedIn && user) {
            try {
                fetch(`/spirits`)
                .then(r => r.json())
                .then(spiritData => {
                    setSpirits(spiritData)
                    // id, spirit name
                })
            } catch (error) {
                console.error('Error fetching spirits.', error)
            }
        }

    }, [loggedIn, user])

    return (
        <SpiritContext.Provider value={{spirits, setSpirits}}>
            {children}
        </SpiritContext.Provider>
    )
}

export { SpiritContext, SpiritProvider }