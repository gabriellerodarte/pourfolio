import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <div>
      <header>
        {/* NavBar element if*** user */}
      </header>
      <main>
        <UserProvider>
          <Outlet/>
        </UserProvider>
      </main>
    </div>
  )
}

export default App;
