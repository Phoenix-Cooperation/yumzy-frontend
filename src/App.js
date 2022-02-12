import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import Auth from "./pages/Auth/Auth";
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div>
      yumzy
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<PrivateRoute>Home</PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
