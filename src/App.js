import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import UserLayout from "./Layouts/UserLayout";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/PostPage"
import { logout } from "./services/firebase-auth"

// import {logout} from "./services/"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<UserLayout/>} >
            <Route path="home" element={<Home />} />
            <Route path="" element={<Posts/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
 