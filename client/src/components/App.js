import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import NavBar from "./NavBar";
import "../styles/app.css";

function App() {
  const { user, loading } = useContext(UserContext)

  return (
    <div className="app-container">
      <header>
        {user?.username && (
          <NavBar/>
        )}
      </header>
      <main>
        {loading ? <div>Loading...</div> : <Outlet/>}
          {/* <Outlet/> */}
      </main>
      <footer>
        {user?.username && (
          <p>Built by {user.username}🍸</p>
        )}
      </footer>
    </div>
  )
}

export default App;
