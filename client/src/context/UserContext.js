import React, { useEffect, useState } from "react";

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [userSpirits, setUserSpirits] = useState([])
    const [loading, setLoading] = useState((true))

    useEffect(() => {
        fetch(`/check_session`)
        .then(r => {
            if (r.ok) return r.json()
        })
        .then(userData => {
            setUser({
                id: userData.id,
                username: userData.username
            })
            setUserSpirits(userData.spirits)
            // setLoggedIn(true)
        })
        .catch(error => {
            console.error('Error fetching session: ', error)
            setUser({})
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (user?.username) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    const deleteCocktail = async (spiritId, cocktailId) => {
        try {
            const res = await fetch(`/cocktails/${cocktailId}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                const error = await res.json()
                return { error: error || "Error deleting cocktail"} 
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
            console.error(err)
            return { error: "Error deleting cocktail. Please try again."}
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, userSpirits, setUserSpirits, deleteCocktail, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }