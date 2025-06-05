import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function Cocktails() {
    const { user } = useContext(UserContext)
    const { id } = useParams()

    const spirit = user?.spirits?.find(spirit => spirit.id.toString() === id)

    console.log(spirit.cocktails)

    return (
        <div>
            <p>My {spirit.name} Cocktails</p>
            {spirit?.cocktails?.map(cocktail => (
                <div>
                    <h4>{cocktail.name}</h4>
                    <p>{cocktail.ingredients}</p>
                    <p>{cocktail.instructions}</p>
                </div>
            ))}
        </div>
    )
}

export default Cocktails