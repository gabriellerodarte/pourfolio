import { useNavigate, useRouteError } from "react-router-dom";


function ErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <div className="error-page">
            <h2 className="error-title">Something went wrong.</h2>
            <p className="error-message">
                {error?.statusText || error?.message || "Unexpected error occured."}
            </p>
            <button className="error-button" onClick={() => navigate("/")}>
                ← Return Home
            </button>
        </div>
    )
}

export default ErrorPage