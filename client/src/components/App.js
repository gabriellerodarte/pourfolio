import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        {/* NavBar element */}
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
