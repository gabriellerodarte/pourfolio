import { Link } from "react-router-dom"


function Home() {
    const user = false

    return (
        <div>
            { user ? (
                <div>
                    <h1>Pourfolio Home</h1>
                    <h2>Welcome {user}!</h2>
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