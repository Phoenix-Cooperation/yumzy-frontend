import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/stylesheets/main.scss";
import UserLayout from "./layouts/UserLayout";
import CreateMenu from "./layouts/CreateMenu";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import PrivateRoute from "./utils/PrivateRoute";
import { logout } from "./services/firebase-auth"
import RecipePanel from "./pages/UploadContent/RecipePanel";
import TipsPanel from "./pages/UploadContent/TipsPanel";
// import ReviewPanel from "./pages/UploadContent/ReviewPanel";
import PostPanel from "./pages/UploadContent/PostPanel";

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
            <Route path="create" element={<PrivateRoute><CreateMenu/></PrivateRoute>} >
              <Route index element={<RecipePanel />} />
              <Route path="recipe" element={<RecipePanel />} />
              <Route path="tips" element={<TipsPanel />} />
              <Route path="post" element={<PostPanel />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
