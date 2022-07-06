import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import UserLayout from "./layouts/UserLayout";
import CreateMenu from "./layouts/CreateMenu";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { logout } from "./services/firebase-auth"

import ProfileInfo from "./components/ProfileInfo";

// import {logout} from "./services/"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<UserLayout/>} >
            <Route path="home" element={<Home />} />
            <Route path="chat" element={<Home />} />
            <Route path="explore" element={<Home />} />
            <Route path="notifications" element={<Home />} />
            <Route path="create" element={<CreateMenu/>} >
              <Route index element={<Home />} />
              <Route path="recipe" element={<Home />} />
              <Route path="tips" element={<Home />} />
              <Route path="review" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ProfileInfo/>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
 