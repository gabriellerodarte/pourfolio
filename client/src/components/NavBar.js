import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/navbar.css";


function NavBar() {
    const { setUser, setUserSpirits } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        fetch(`/logout`, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUser({})
                setUserSpirits([])
                navigate("/")
            } else {
                return r.json().then(errorData => {
                    return Promise.reject(errorData)
                })
            }
        })
        .catch(errorData => {
            console.log("Error:", errorData)
        })

    }

    return (
        <nav>
            <div>
                <div>pourfolio</div>
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