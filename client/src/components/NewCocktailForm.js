import { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SpiritContext } from "../context/SpiritContext";
import "../styles/formstyles.css";


function NewCocktailForm({ setShowCocktailForm, setShowSpiritForm }) {
    const { id } = useParams()
    const { spirits } = useContext(SpiritContext)

    const CocktailSchema = Yup.object().shape({
        name: Yup.string().required("Name is required."),
        spirit: !id ? Yup.string().required('Please select a spirit.') : Yup.string(),
        ingredients: Yup.string().required("Ingredients are required."),
        instructions: Yup.string().required("Instructions are required.")
    })

    const initialValues = {
        spirit: id || '',
        name: '',
        ingredients: '',
        instructions: ''
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={CocktailSchema}
                onSubmit={(values, {resetForm}) => {
                    const ingredientsArray = values.ingredients.split('\n').map(line => line.trim()).filter(line => line);
                    console.log('Form submitted with values:', {
                        ...values,
                        ingredients: ingredientsArray,
                        instructions: values.instructions
                    });
                    // fetch to submit cocktail 
                    resetForm()
                }}
            >
                <Form>
                    <label htmlFor="name">Cocktail Name</label>
                    <Field name="name" type="text"/>
                    <ErrorMessage name="name"/>

                    {!id && (
                        <div>
                            <label htmlFor="spirit">Select a Spirit:</label>
                            <Field as="select" name="spirit">
                                <option value="">--Choose a Spirit--</option>
                                {spirits?.map(spirit => (
                                    <option key={spirit.id} value={spirit.id}>{spirit.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="spirit" component="div" className="error"/>
                        </div>
                    )}
    
                    <label htmlFor="ingredients">Ingredients:</label>
                    <Field name="ingredients" as="textarea" placeholder="List ingredients here, one per line" rows="7"/>
                    <ErrorMessage name="ingredients" component="div" className="error"/>
    
                    <label htmlFor="instructions">Instructions:</label>
                    <Field name="instructions" as="textarea" placeholder="Provide instructions here" rows="10"/>
                    <ErrorMessage name="instructions" component="div" className="error"/>
    
                    <div className="centered-button">
                        <button type="submit">Create Cocktail</button>
                    </div>                    
                </Form>
            </Formik>
            <div className="centered-button">
                <button 
                    onClick={() => {
                        setShowCocktailForm(false)
                        setShowSpiritForm(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>

    )
}

export default NewCocktailForm