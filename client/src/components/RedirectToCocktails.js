import { Navigate, useParams } from "react-router-dom";


function RedirectToCocktails() {
    const { id } = useParams()
    return <Navigate to={`/my-spirits/${id}/cocktails`}/>
}

export default RedirectToCocktails