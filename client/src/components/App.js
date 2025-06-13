import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import "../styles/app.css";

function App() {
  const { user, loggedIn } = useContext(UserContext)

  return (
    <div className="app-container">
      <header>
        {loggedIn && (
          <NavBar/>
        )}
      </header>
      <main>
          <Outlet/>
      </main>
      <footer>
        {loggedIn && (
          <p>Built by {user.username}🍸</p>
        )}
      </footer>
    </div>
  )
}

export default App;
