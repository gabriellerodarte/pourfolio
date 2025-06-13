import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";


function PrivateRoute({ children }) {
    const { loggedIn } = useContext(UserContext)

    return loggedIn ? children : <Navigate to="/"/>
}

export default PrivateRoute