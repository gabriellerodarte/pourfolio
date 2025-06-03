import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        {/* NavBar element if*** user */}
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
