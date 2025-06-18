import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function CocktailRecipe() {
    const { userSpirits } = useContext(UserContext)
    const { spiritId, id } = useParams()
    const navigate = useNavigate()
    
    const spirit = userSpirits.find(spirit => spirit.id === parseInt(spiritId))
    const cocktail = spirit.cocktails.find(cocktail => cocktail.id === parseInt(id))

    return (
        <div>
            <p className="back-link" onClick={() => navigate(`/my-spirits/${spiritId}/cocktails`)}>
                ← back to {spirit.name} cocktails
            </p>
            <div className="cocktail-recipe-page">
                <div className="recipe-card">
                    <h2 className="recipe-name">{cocktail.name}</h2>
                    <div className="recipe-section">
                        <h4>Ingredients</h4>
                        <ul className="ingredient-list">
                            {cocktail.ingredients.split('\n').map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                            ))}
                        </ul>            
                    </div>
                    <div className="recipe-section">
                        <h4>Instructions</h4>
                        <p className="recipe-block">{cocktail.instructions}</p>
                    </div>
                    <div className="recipe-actions">
                        <button onClick={() => navigate(`/my-spirits/${spiritId}/cocktails/${id}/edit`)} className="edit-btn">edit</button>
                        <button className="delete-btn">delete</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CocktailRecipe