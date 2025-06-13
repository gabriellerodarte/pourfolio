import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NewCocktailForm from "../components/NewCocktailForm";
import NewSpiritForm from "./NewSpiritForm";

function MySpirits() {
    const { userSpirits } = useContext(UserContext)
    const navigate = useNavigate()
    const [showCocktailForm, setShowCocktailForm] = useState(false)
    const [showSpiritForm, setShowSpiritForm] = useState(false)

    // if (!userSpirits) {
    //     return <div>Add cocktail recipes to see your spirits here!</div>
    // }

    return (
        <div>
            <h2>My Spirits</h2>
            {userSpirits.map(spirit => (
                <div key={spirit.id} onClick={() => navigate(`/my-spirits/${spirit.id}/cocktails`)}>
                    <h3>{spirit?.name}</h3>
                    <p>{spirit?.cocktails?.length} cocktails</p>
                    <p>{'>'}</p>
                </div>
            ))}
            {userSpirits.length == 0 && (
                <div>Add cocktail recipes to see your spirits here!</div>
            )}
            {showCocktailForm ? (
                <div>
                    <NewCocktailForm setShowCocktailForm={setShowCocktailForm}/>
                    <h5>Don't see the spirit you're looking for?</h5>
                    <p>Add a new spirit below to access it in the dropdown.</p>
                    {showSpiritForm ? (
                        <NewSpiritForm setShowSpiritForm={setShowSpiritForm}/>
                    ) : (
                        <button onClick={() => setShowSpiritForm(true)}>+ Add Spirit</button>
                    )}
                </div>
            ) : (
                <button onClick={() => setShowCocktailForm(true)}>+ New Cocktail</button>
            )}


        </div>
    )
}

export default MySpirits