import App from "./components/App";
import CocktailCards from "./components/CocktailCards";
import Home from "./components/Home";
import Login from "./components/Login";
import MySpirits from "./components/MySpirits";
import SignUp from "./components/Signup";
import Spirits from "./components/Spirits";
import PrivateRoute from "./components/PrivateRoute";
import CocktailRecipe from "./components/CocktailRecipe";
import EditCocktail from "./components/EditCocktail";


const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "/spirits",
                element: (
                    <PrivateRoute>
                        <Spirits/>
                    </PrivateRoute>
                )
            },
            {
                path: "/my-spirits",
                element: (
                    <PrivateRoute>
                        <MySpirits/>
                    </PrivateRoute>
                )
            },
            {
                path: "/my-spirits/:id/cocktails",
                element: (
                    <PrivateRoute>
                        <CocktailCards/>
                    </PrivateRoute>
                )
            },
            {
                path: "/my-spirits/:spiritId/cocktails/:id",
                element: (
                    <PrivateRoute>
                        <CocktailRecipe/>
                    </PrivateRoute>
                )
            },
            {
                path: "/my-spirits/:spiritId/cocktails/:id/edit",
                element: (
                    <PrivateRoute>
                        <EditCocktail/>
                    </PrivateRoute>
                )
            }
        ]
    }
]

export default routes