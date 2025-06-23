import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
    const { user, setUser, setUserSpirits } = useContext(UserContext)
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')

    if (user?.username) {
        return <Navigate to="/"/>
    }

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("Username required"),
        password: Yup.string().required("Password required")
    })

    const initialValues = {
        username: "",
        password: ""
    }

    return (
        <div className="auth-container">
            <h1 onClick={() => navigate("/")}>pourfolio</h1>
            <br/>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values, {resetForm}) => {
                    fetch(`/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                    .then(r => {
                        if (!r.ok) {
                            return r.json().then(errorData => {
                                return Promise.reject(errorData)
                            })
                        }
                        return r.json()
                    })
                    .then(userData => {
                        setUser({
                            id: userData.id,
                            username: userData.username
                        })
                        setUserSpirits(userData.spirits)
                        // setLoggedIn(true)
                        navigate("/")
                        resetForm()
                    })
                    .catch(errorData => {
                        console.log("Login error:", errorData)
                        setErrorMsg(errorData.error)
                        resetForm()
                    })
                }}
            >
                <Form className="auth-form">
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text"/>
                    <ErrorMessage name="username" component="div" className="error"/>

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password"/>
                    <ErrorMessage name="password" component="div" className="error"/>

                    {errorMsg && <div className="error">{errorMsg}. Please try again.</div>}

                    <div className="centered-button">
                        <button type="submit">Log In</button>
                    </div>
                </Form>
            </Formik>
        <p>
            Don't have an account? {" "}
            <NavLink to="/signup">Sign up</NavLink>
        </p>
        </div>
    )
}

export default Login