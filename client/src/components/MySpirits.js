import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NewCocktailForm from "../components/NewCocktailForm";
import NewSpiritForm from "./NewSpiritForm";
import "../styles/myspirits.css";

function MySpirits() {
    const { userSpirits } = useContext(UserContext)
    const navigate = useNavigate()
    const [showCocktailForm, setShowCocktailForm] = useState(false)
    const [showSpiritForm, setShowSpiritForm] = useState(false)

    return (
        <div className="my-spirits-container">
            <h2>My Spirits</h2>
            <div className="spirit-card-list">
                {userSpirits.map(spirit => (
                    <div key={spirit.id} className="spirit-card" onClick={() => navigate(`/my-spirits/${spirit.id}/cocktails`)}>
                        <div className="spirit-info">
                            <h3>{spirit?.name}</h3>
                            <p>{spirit?.cocktails?.length} cocktails</p>
                        </div>
                        <p className="arrow">{'>'}</p>
                    </div>
                ))}
                {userSpirits.length == 0 && (
                    <p className="empty-message">Add cocktail recipes to see your spirits here!</p>
                )}
            </div>
            
            <div className="form-section">
                {showCocktailForm ? (
                    <div>
                        <NewCocktailForm setShowCocktailForm={setShowCocktailForm} setShowSpiritForm={setShowSpiritForm}/>
                        <hr></hr>
                        <h5>Don't see the spirit you're looking for?</h5>
                        <p className="add-note">Add a new spirit below to access it in the dropdown.</p>
                        {showSpiritForm ? (
                            <NewSpiritForm setShowSpiritForm={setShowSpiritForm}/>
                        ) : (
                            <div className="centered-button">
                                <button className="centered-button" onClick={() => setShowSpiritForm(true)}>+ Add Spirit</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="centered-button">
                        <button onClick={() => setShowCocktailForm(true)}>+ New Cocktail</button>
                    </div>
                )}
            </div>


        </div>
    )
}

export default MySpirits