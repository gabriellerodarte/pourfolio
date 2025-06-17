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
            <hr></hr>
            <h3 className="form-heading">Craft A New Cocktail</h3>
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
                    <Field name="name" type="text" placeholder="e.g. Dirty Martini"/>
                    <ErrorMessage name="name"/>

                    {!id && (
                        <div>
                            <label htmlFor="spirit">Spirit</label>
                            <Field as="select" name="spirit">
                                <option value="">Select a Spirit</option>
                                {spirits?.map(spirit => (
                                    <option key={spirit.id} value={spirit.id}>{spirit.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="spirit" component="div" className="error"/>
                        </div>
                    )}
    
                    <div className="label-with-tooltip">
                        <label htmlFor="ingredients">Ingredients</label>
                        <div className="tooltip-wrapper">
                            <span className="tooltip-icon">?</span>
                            <div className="tooltip-text">List one ingredient per line, i.e.: 2 oz gin</div>
                        </div>
                    </div>
                    <Field name="ingredients" as="textarea" placeholder={`e.g.\n2 oz gin\n0.5 oz olive brine\n0.25 oz dry vermouth\nPimento stuffed olives`} rows="7"/>
                    <ErrorMessage name="ingredients" component="div" className="error"/>
    
                    <div className="label-with-tooltip">
                        <label htmlFor="ingredients">Instructions</label>
                        <div className="tooltip-wrapper">
                            <span className="tooltip-icon">?</span>
                            <div className="tooltip-text">Include steps like shake/stir/build, glassware, and garnish.</div>
                        </div>
                    </div>
                    <Field name="instructions" as="textarea" placeholder={`e.g.\nAdd gin, olive brine, and dry vermouth to cocktail shaker. Fill with ice. Shake until the outside of the shaker feels chilled. Strain into martini glass.\n\nGarnish with 3 olives.`} rows="10"/>
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