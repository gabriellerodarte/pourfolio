import { useContext, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import NewCocktailForm from "./NewCocktailForm"
import "../styles/cocktails.css"


function CocktailCards() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { userSpirits } = useContext(UserContext)
    const [showCocktailForm, setShowCocktailForm] = useState(false)

    const ownsSpirit = userSpirits.some(s => s.id === parseInt(id))

    if (!ownsSpirit) {
        return <Navigate to="/my-spirits"/>
    }

    const spirit = userSpirits.find(spirit => spirit.id === parseInt(id))

    return (
        <div>
            <p className="back-link" onClick={() => navigate(`/my-spirits`)}>
                ← back to my spirits
            </p>
            <br></br>
            <h2 className="page-title">{spirit?.name}</h2>
            <div className="cocktail-grid">
                {spirit?.cocktails?.map(cocktail => (
                    <div
                        key={cocktail.id}
                        className="cocktail-card"
                        onClick={() => navigate(`/my-spirits/${id}/cocktails/${cocktail.id}`)}
                    >
                        {cocktail.name}
                    </div>
                ))}
            </div>
            {showCocktailForm ? (
                <NewCocktailForm setShowCocktailForm={setShowCocktailForm}/>
            ) : (
                <div className="centered-button">
                    <button onClick={() => setShowCocktailForm(true)}>+ New {spirit?.name} Cocktail</button>
                </div>
            )}
        </div>
    )
}

export default CocktailCards