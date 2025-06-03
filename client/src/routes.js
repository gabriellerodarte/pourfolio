import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";


const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
                // user homepage/dashboard
                // spirits page
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            }
        ]
    }
]

export default routes