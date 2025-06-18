import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function CocktailRecipe() {
    const { userSpirits, setUserSpirits } = useContext(UserContext)
    const { spiritId, id } = useParams()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    
    const spirit = userSpirits.find(spirit => spirit.id === parseInt(spiritId))
    const cocktail = spirit.cocktails.find(cocktail => cocktail.id === parseInt(id))

    const handleDelete = () => {
        console.log("deleting cocktail")
        fetch(`/cocktails/${id}`, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUserSpirits((prevSpirits) => {
                    const spiritIndex = prevSpirits.findIndex(s => s.id === parseInt(spiritId))
                    const spirit = prevSpirits[spiritIndex]

                    const remainingCocktails = spirit.cocktails.filter(c => c.id !== parseInt(id))
                    const updatedSpirit = {...spirit, cocktails: remainingCocktails}

                    const newSpirits = [...prevSpirits]
                    if (remainingCocktails.length === 0) {
                        newSpirits.splice(spiritIndex, 1)
                    } else {
                        newSpirits[spiritIndex] = updatedSpirit
                    }

                    setTimeout(() => {
                        remainingCocktails.length === 0 ? navigate("/my-spirits") : navigate(`/my-spirits/${spiritId}/cocktails`)
                    }, 0)

                    return newSpirits
                })
                setShowModal(false)

            } else {
                console.error("Failed to delete cocktail:", r.status)
            }
        })
    }

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
                        <button className="delete-btn" onClick={() => setShowModal(true)}>delete</button>
                    </div>
                </div>

            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Delete this cocktail?</h4>
                        <p>This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="confirm" onClick={handleDelete}>Delete</button>
                            <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CocktailRecipe