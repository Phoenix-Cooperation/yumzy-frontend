import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import UserLayout from "./layouts/UserLayout";
import CreateMenu from "./layouts/CreateMenu";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import { logout } from "./services/firebase-auth"
import RecipePanel from "./pages/UploadContent/Recipe/RecipePanel";
import TipsPanel from "./pages/UploadContent/Tips/TipsPanel";
import ReviewPanel from "./pages/UploadContent/Review/ReviewPanel";
import PostPanel from "./pages/UploadContent/Post/PostPanel";

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
              <Route index element={<RecipePanel />} />
              <Route path="recipe" element={<RecipePanel />} />
              <Route path="tips" element={<TipsPanel />} />
              <Route path="review" element={<ReviewPanel />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
