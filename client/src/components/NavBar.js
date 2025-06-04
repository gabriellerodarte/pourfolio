import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function NavBar() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch(`/logout`, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUser(null)
                navigate("/")
            } else {
                throw new Error("Failed to logout")
            }
        })
    }

    return (
        <nav>
            <div>
                <div>*POUR*folio</div>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="my-spirits">View My Spirits</NavLink>
                    <NavLink to="/spirits">Browse All Spirits</NavLink>
                </div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar