import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { SpiritProvider } from "./context/SpiritContext";

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
        <SpiritProvider>
            <RouterProvider router={router}/>
        </SpiritProvider>
    </UserProvider>
);
