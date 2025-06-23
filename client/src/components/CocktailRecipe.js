import { useContext, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function CocktailRecipe() {
    const { userSpirits, deleteCocktail } = useContext(UserContext)
    const { spiritId, id } = useParams()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const ownsCocktail = userSpirits.flatMap(s => s.cocktails).some(c => c.id === parseInt(id)) 

    if (!ownsCocktail) {
        return <Navigate to="/my-spirits"/>
    }
    
    const spirit = userSpirits.find(spirit => spirit.id === parseInt(spiritId))
    const cocktail = spirit?.cocktails?.find(cocktail => cocktail.id === parseInt(id))

    if (!spirit || !cocktail) {
        navigate("/my-spirits")
        return null
    }

    const handleDelete = async () => {
        const { error, success } = await deleteCocktail(spiritId, id)
        if (error) {
            console.log(error)
            setErrorMsg(error)
            setShowModal(false)
        } else {
            userSpirits.find(s => s.id === spiritId) ? navigate(`/my-spirits/${spiritId}/cocktails`) : navigate("/my-spirits")
            setShowModal(false)
            console.log(success)
        }
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
            {errorMsg && (
                <div className="error">
                    {errorMsg}
                </div>
            )}
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