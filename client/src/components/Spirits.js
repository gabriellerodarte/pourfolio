import { useContext, useState } from "react"
import { SpiritContext } from "../context/SpiritContext"
import NewSpiritForm from "./NewSpiritForm"

function Spirits() {
    const { spirits } = useContext(SpiritContext)
    const [showSpiritForm, setShowSpiritForm] = useState(false)

    return (
        <div>
            <h2>Spirits</h2>
            <div className="all-spirit-grid">
                {spirits?.map(spirit => (
                    <div key={spirit.id} className="all-spirit-card">
                        {spirit.name}
                    </div>
                ))}
            </div>
            {showSpiritForm ? (
                <div>
                    <br></br>
                    <hr></hr>
                    <h4>Add A New Spirit</h4>
                    <NewSpiritForm setShowSpiritForm={setShowSpiritForm}/>
                </div>
            ) : (
                <div>
                    <br></br>
                    <h5>Don't see the spirit you're looking for?</h5>
                    <div className="centered-button">
                        <button onClick={() => setShowSpiritForm(true)}>+ Add Spirit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Spirits