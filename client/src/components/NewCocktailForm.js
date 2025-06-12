import { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SpiritContext } from "../context/SpiritContext";


function SpiritForm({ setShowCocktailForm }) {
    const { id } = useParams()
    const { spirits } = useContext(SpiritContext)

    const CocktailSchema = Yup.object().shape({
        spirit: !id ? Yup.string().required('Please select a spirit.') : Yup.string(),
        ingredients: Yup.string().required("Ingredients are required."),
        instructions: Yup.string().required("Instructions are required.")
    })

    const initialValues = {
        spirit: id || '',
        ingredients: '',
        instructions: ''
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={CocktailSchema}
                onSubmit={(values, {resetForm}) => {
                    // fetch to submit cocktail 
                    console.log(values)
                    resetForm()
                }}
            >
                <Form>
                    <label htmlFor="spirit">Select a Spirit:</label>
                    <Field as="select" name="spirit">
                        <option value="">--Choose a Spirit--</option>
                        {spirits?.map(spirit => (
                            <option key={spirit.id} value={spirit.id}>{spirit.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="spirit"/>
    
                    <label htmlFor="ingredients">Ingredients:</label>
                    <Field name="ingredients" type="text" placeholder="List ingredients here"/>
                    <ErrorMessage name="ingredients"/>
    
                    <label htmlFor="instructions">Instructions:</label>
                    <Field name="instructions" type="text" placeholder="Provide instructions here"/>
                    <ErrorMessage name="instructions"/>
    
                                        
                    <button type="submit">Create Cocktail</button>
                </Form>
            </Formik>
            <button onClick={() => setShowCocktailForm(false)}>Cancel</button>
        </div>

    )
}

export default SpiritForm