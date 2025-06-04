import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"


function NavBar() {
    const { setUser } = useContext(UserContext)
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
                <div>*pour*folio</div>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/spirits">Spirits</NavLink>
                </div>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}

export default NavBar