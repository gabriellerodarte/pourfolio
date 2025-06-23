import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


function EditCocktail() {
    const { spiritId, id } = useParams()
    const navigate = useNavigate()
    const { userSpirits, setUserSpirits } = useContext(UserContext)

    const ownsCocktail = userSpirits.flatMap(s => s.cocktails).some(c => c.id === parseInt(id)) 

    if (!ownsCocktail) {
        return <Navigate to="/my-spirits"/>
    }

    const cocktail = userSpirits.flatMap(spirit => spirit.cocktails).find(cocktail => cocktail.id === parseInt(id))
    
    const CocktailSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        ingredients: Yup.string().required("Ingredients are required"),
        instructions: Yup.string().required("Instructions are required")
    })
    
        const initialValues = {
            name: cocktail?.name,
            ingredients: cocktail?.ingredients,
            instructions: cocktail?.instructions
        }

    if (!cocktail) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <h3 className="form-heading">Edit Cocktail</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={CocktailSchema}
                onSubmit={( values, {resetForm}) => {
                    fetch(`/cocktails/${id}`, {
                        method: 'PATCH',
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
                    .then(updatedCocktail => {
                        console.log(updatedCocktail)
                        setUserSpirits((prevSpirits) => (
                            prevSpirits.map(spirit => {
                                if (spirit.id === parseInt(spiritId)) {
                                    return {
                                        ...spirit,
                                        cocktails: spirit.cocktails.map(cocktail => (
                                            cocktail.id === parseInt(id) ? updatedCocktail : cocktail
                                        ))
                                    }
                                }
                                return spirit
                            }) 
                        ))
                        resetForm()
                        navigate(`/my-spirits/${spiritId}/cocktails/${id}`)
                    })
                    .catch(errorData => {
                        console.log("Error:", errorData)
                        resetForm()
                    })
                }}
            >
                <Form>
                    <label htmlFor="name">Cocktail Name</label>
                    <Field name="name" type="text"/>
                    <ErrorMessage name="name"/>
                    <p className="spirit-reference">made with {userSpirits.find(spirit => spirit.id === parseInt(spiritId))?.name}</p>
    
                    <div className="label-with-tooltip">
                        <label htmlFor="ingredients">Ingredients</label>
                        <div className="tooltip-wrapper">
                            <span className="tooltip-icon">?</span>
                            <div className="tooltip-text">List one ingredient per line, i.e.: 2 oz gin</div>
                        </div>
                    </div>
                    <Field name="ingredients" as="textarea" rows="7"/>
                    <ErrorMessage name="ingredients" component="div" className="error"/>
    
                    <div className="label-with-tooltip">
                        <label htmlFor="ingredients">Instructions</label>
                        <div className="tooltip-wrapper">
                            <span className="tooltip-icon">?</span>
                            <div className="tooltip-text">Include steps like shake/stir/build, glassware, and garnish.</div>
                        </div>
                    </div>
                    <Field name="instructions" as="textarea" rows="10"/>
                    <ErrorMessage name="instructions" component="div" className="error"/>
    
                    <div className="centered-button">
                        <button type="submit">Update Cocktail</button>
                    </div>                    

                </Form>
            </Formik>
                <div className="centered-button">
                    <button 
                        onClick={() => navigate(`/my-spirits/${spiritId}/cocktails/${id}`)}
                    >
                        Cancel
                    </button>
                </div>
        </div>
    )
}

export default EditCocktail