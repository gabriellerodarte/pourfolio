import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"


function MySpirits() {
    const { user, userSpirits } = useContext(UserContext)
    const navigate = useNavigate()

    console.log(userSpirits)

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Spirits</h2>
            {userSpirits.map(spirit => (
                <div key={spirit.id} onClick={() => navigate(`/my-spirits/${spirit.id}/cocktails`)}>
                    <h3>{spirit?.name}</h3>
                    <p>{spirit?.cocktails?.length} cocktails</p>
                    <p>{'>'}</p>
                </div>
            ))}
        </div>
    )
}

export default MySpirits