import { useContext } from "react"
import { SpiritContext } from "../context/SpiritContext"


function Spirits() {
    const { spirits } = useContext(SpiritContext)

    return (
        <div>
            <p>Spirits Page</p>
            {spirits.map(spirit => <p>{spirit.name}</p>)}
        </div>
    )
}

export default Spirits