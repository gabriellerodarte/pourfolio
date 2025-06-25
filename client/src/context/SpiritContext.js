import React, { useCallback, useState } from "react";

const SpiritContext = React.createContext()

function SpiritProvider({children}) {
    const [spirits, setSpirits] = useState([])

    const getSpirits = useCallback(() => {
        try {
            fetch(`/spirits`)
            .then(r => r.json())
            .then(spiritData => {
                setSpirits(spiritData)
            })
        } catch (error) {
            console.error('Error fetching spirits.', error)
        }
    }, [])

    return (
        <SpiritContext.Provider value={{spirits, setSpirits, getSpirits}}>
            {children}
        </SpiritContext.Provider>
    )
}

export { SpiritContext, SpiritProvider }