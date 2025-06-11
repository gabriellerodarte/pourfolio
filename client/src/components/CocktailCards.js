import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function CocktailCards() {
    const { userSpirits } = useContext(UserContext)
    const { id } = useParams()

    const spirit = userSpirits.find(spirit => spirit.id.toString() === id)

    return (
        <div>
            <p>My {spirit?.name} Cocktails</p>
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

export default CocktailCards