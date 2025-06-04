import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function Home() {
    const { user } = useContext(UserContext)

    return (
        <div>
            <h1>Pourfolio</h1>
            { user ? (
                <div>
                    <p>Your curated cocktail recipe vault.</p>
                </div>
            ) : (
                <div>
                    <p>Browse spirits, view saved recipes, and mix up something new.</p>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </div>
    )
}

export default Home