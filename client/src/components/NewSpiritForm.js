import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { SpiritContext } from "../context/SpiritContext";


function NewSpiritForm({ setShowSpiritForm }) {
    const { setSpirits } = useContext(SpiritContext)

    const SpiritSchema = Yup.object().shape({
        name: Yup.string().required("Spirit name required")
    })

    const initialValues = {
        name: ""
    }

    return (
        <div>
            <p>New Spirit Form</p>
            <Formik
                initialValues={initialValues}
                validationSchema={SpiritSchema}
                onSubmit={(values, {resetForm}) => {
                    fetch(`/spirits`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    })
                    .then(r => {
                        if (!r.ok) throw new Error("Error creating spirit")
                        return r.json()
                    })
                    .then(newSpirit => {
                        setSpirits(prev => [...prev, newSpirit])
                        resetForm()
                        setShowSpiritForm(false)
                    })
                }}
            >
                <Form>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text"/>
                    <ErrorMessage name="name"/>
                    
                    <button type="submit">Add Spirit</button>
                </Form>
            </Formik>
            <button onClick={() => setShowSpiritForm(false)}>Cancel</button>
        </div>
    )
}

export default NewSpiritForm