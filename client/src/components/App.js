import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header>

      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default App;
