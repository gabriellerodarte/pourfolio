import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import MySpiritCard from "./MySpiritCard"
import { useNavigate } from "react-router-dom"


function MySpirits() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div>
            <h2>Spirits</h2>
            {user?.spirits?.map(spirit => (
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