import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";

function App() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <header>
        {user && (
          <NavBar/>
        )}
      </header>
      <main>
          <Outlet/>
      </main>
    </div>
  )
}

export default App;
