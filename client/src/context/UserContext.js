import React, { useEffect, useState} from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState({})
    const [userSpirits, setUserSpirits] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        fetch(`/check_session`)
        .then(r => {
            if (r.ok) return r.json()
            throw new Error('Failed to fetch session')
        })
        .then(userData => {
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

    const deleteCocktail = async (spiritId, cocktailId) => {
        try {
            const res = await fetch(`/cocktails/${cocktailId}`, {
                method: 'DELETE',
            })
            
            if (!res.ok) {
                const data = await res.json()
                return { error: data || "Error deleting cocktail"} 
            } else {
                setUserSpirits((prevSpirits) => {
                    const spiritIndex = prevSpirits.findIndex(s => s.id === parseInt(spiritId))
                    const spirit = prevSpirits[spiritIndex]

                    const remainingCocktails = spirit.cocktails.filter(c => c.id !== parseInt(cocktailId))
                    const updatedSpirit = {...spirit, cocktails: remainingCocktails}

                    const newSpirits = [...prevSpirits]
                    if (remainingCocktails.length === 0) {
                        newSpirits.splice(spiritIndex, 1)
                    } else {
                        newSpirits[spiritIndex] = updatedSpirit
                    }

                    return newSpirits
                })
                return { success: "Cocktail successfully deleted"}
            }
            

        } catch (err) {
            console.log(err)
            return { error: "Error deleting cocktail. Please try again."}
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, userSpirits, setUserSpirits, loggedIn, setLoggedIn, deleteCocktail }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }