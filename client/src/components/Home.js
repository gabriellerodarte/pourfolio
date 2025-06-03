import { Link } from "react-router-dom"


function Home() {

    return (
        <div>
            <h1>Pourfolio</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Home