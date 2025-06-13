import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/home.css";


function Home() {
    const { loggedIn } = useContext(UserContext)

    return (
        <div className="home-container">
            <h1>pourfolio</h1>
            { loggedIn ? (
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