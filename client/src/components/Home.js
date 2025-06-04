import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function Home() {
    const { user } = useContext(UserContext)

    return (
        <div>
            { user ? (
                <div>
                    <h1>Pourfolio Home</h1>
                    <h2>Welcome {user.username}!</h2>
                </div>
            ) : (
                <div>
                    <h1>Pourfolio</h1>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </div>
    )
}

export default Home