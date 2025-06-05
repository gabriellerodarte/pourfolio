import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import MySpirits from "./components/MySpirits";
import SignUp from "./components/Signup";
import Spirits from "./components/Spirits";


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
                element: <Spirits/>,
            },
            {
                path: "/my-spirits",
                element: <MySpirits/>
            }
        ]
    }
]

export default routes