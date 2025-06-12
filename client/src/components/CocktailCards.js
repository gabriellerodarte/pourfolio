import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import NewCocktailForm from "./NewCocktailForm"


function CocktailCards() {
    const { userSpirits } = useContext(UserContext)
    const { id } = useParams()
    const [showCocktailForm, setShowCocktailForm] = useState(false)

    const spirit = userSpirits.find(spirit => spirit.id.toString() === id)

    return (
        <div>
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
            {showCocktailForm ? (
                <NewCocktailForm setShowCocktailForm={setShowCocktailForm}/>
            ) : (
                <button onClick={() => setShowCocktailForm(true)}>+ New {spirit.name} Cocktail</button>
            )}
        </div>
    )
}

export default CocktailCards