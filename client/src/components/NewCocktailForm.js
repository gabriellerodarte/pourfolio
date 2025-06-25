import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SpiritContext } from "../context/SpiritContext";
import { UserContext } from "../context/UserContext";
import "../styles/formstyles.css";


function NewCocktailForm({ setShowCocktailForm, setShowSpiritForm }) {
    const { id } = useParams()
    const { spirits, getSpirits } = useContext(SpiritContext)
    const { setUserSpirits } = useContext(UserContext)

    useEffect(() => {
        getSpirits()
    }, [getSpirits])

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
                    const newCocktail = {
                        name: values.name,
                        spirit_id: parseInt(values.spirit),
                        ingredients: values.ingredients,
                        instructions: values.instructions,
                    }
                    fetch(`/cocktails`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newCocktail)
                    })
                    .then(r => {
                        if (!r.ok) {
                            return r.json().then(errorData => {
                                return Promise.reject(errorData)
                            })
                        }
                        return r.json()
                    })
                    .then(newCocktailData => {
                        setUserSpirits((prevSpirits) => {
                            const spiritIndex = prevSpirits.findIndex(spirit => spirit.id === newCocktail.spirit_id)
                            if (spiritIndex > -1) {
                                const updatedSpirits = [...prevSpirits]
                                updatedSpirits[spiritIndex].cocktails.push(newCocktailData)
                                return [...updatedSpirits]
                            } else {
                                const spirit = spirits.find(spirit => spirit.id === newCocktail.spirit_id)
                                const newSpirit = {
                                    ...spirit,
                                    cocktails: [
                                        newCocktailData
                                    ]
                                }
                                return [...prevSpirits, newSpirit]
                            }

                        })
                        resetForm()
                        setShowCocktailForm(false)
                        if (setShowSpiritForm) {
                            setShowSpiritForm(false)
                        }
                    })
                    .catch(errorData => {
                        console.log("New Cocktail Error:", errorData.error)
                    })

                }}
            >
                <Form>
                    <label htmlFor="name">Cocktail Name</label>
                    <Field name="name" type="text" placeholder="e.g. Dirty Martini"/>
                    <ErrorMessage name="name"/>

                    {!id && (
                        <div>
                            <label htmlFor="spirit_id">Spirit</label>
                            <Field as="select" name="spirit">
                                <option value="">Select a Spirit</option>
                                {spirits?.map(spirit => (
                                    <option key={spirit.id} value={spirit.id}>{spirit.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="spirit_id" component="div" className="error"/>
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
                        if (setShowSpiritForm) {
                            setShowSpiritForm(false)
                        }
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>

    )
}

export default NewCocktailForm