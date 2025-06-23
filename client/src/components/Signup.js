import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import "../styles/auth.css";


function Signup() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    if (user?.username) {
        return <Navigate to="/"/>
    }

    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Username required'),
        password: Yup.string().required('Password required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    })

    const initialValues = {
        username: "",
        password: "",
        confirmPassword: ""
    }

    return (
        <div className='auth-container'>
            <h1 onClick={() => navigate("/")}>pourfolio</h1>
            <h3>Sign up to start browsing spirits<br/>and crafting cocktails</h3>

            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm, setErrors }) => {
                    fetch(`/signup`, {
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
                    .then(newUserData => {
                        setUser(newUserData)
                        // setLoggedIn(true)
                        resetForm()
                        navigate("/")
                    })
                    .catch(errorData => {
                        console.error("Signup error:", errorData)
                        setErrors({ username: errorData.error })
                    })
                }}
            >
                <Form className='auth-form'>
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text"/>
                    <ErrorMessage name="username" component="div" className="error"/>

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password"/>
                    <ErrorMessage name="password" component="div" className="error"/>


                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password"/>
                    <ErrorMessage name="confirmPassword" component="div" className="error"/>

                    <div className='centered-button'>
                        <button type="submit">Sign Up</button>
                    </div>
                </Form>
            </Formik>
            <NavLink to="/login">Already have an account?</NavLink>
        </div>
    )
}

export default Signup