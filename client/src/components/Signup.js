import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Signup() {

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
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={values => {
                console.log(values)
                //fetch logic
            }}
        >
            <Form>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text"/>
                <ErrorMessage name="username"/>

                <label htmlFor="password">Password</label>
                <Field name="password" type="password"/>
                <ErrorMessage name="password"/>


                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field name="confirmPassword" type="password"/>
                <ErrorMessage name="confirmPassword"/>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )
}

export default Signup