import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { logout } from "./services/firebase-auth"

import PrivateRoute from "./utils/PrivateRoute";

// import {logout} from "./services/"

function App() {
  return (
    <div>
      yumzy
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}

export default App;
