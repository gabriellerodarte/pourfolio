import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
    const { setUser } = useContext(UserContext)

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required("Username required"),
        password: Yup.string().required("Password required")
    })

    const initialValues = {
        username: "",
        password: ""
    }

    return (
        <div>
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
                        if (!r.ok) throw new Error('Invalid username or password')
                        return r.json()
                    })
                    .then(userData => {
                        setUser(userData)
                        resetForm()
                    })
                }}
            >
                <Form>
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text"/>
                    <ErrorMessage name="username"/>

                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password"/>
                    <ErrorMessage name="password"/>

                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login