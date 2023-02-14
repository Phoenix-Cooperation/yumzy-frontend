import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route,} from "react-router-dom";

import "./assets/stylesheets/main.scss";

import UserLayout from "./layouts/UserLayout";
import CreateMenu from "./layouts/CreateMenu";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";

// import Posts from "./pages/Posts/PostPage"
import RecipePanel from "./pages/createContent/RecipePanel";
import TipsPanel from "./pages/createContent/TipsPanel";
// import ReviewPanel from "./pages/UploadContent/ReviewPanel";
import PostPanel from "./pages/createContent/PostPanel";

// import {logout} from "./services/"
import {auth, getIdToken} from "./services/firebase-auth";
import {logout} from "./services/firebase-auth"
import PrivateRoute from "./utils/PrivateRoute";
import userStore from "./utils/userStore";
import ContentModal from "./pages/Posts/ContentModal";
import NotificationPanel from "./pages/setting/NotificationPanel";
import PrivacyPanel from "./pages/setting/PrivacyPanel";
import LogoutPanel from "./pages/setting/LogoutPanel";
import Setting from "./layouts/Setting";

function App() {

  // console.log(auth?.currentUser)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        console.log(token);
        userStore.setToken(token)
        console.log("token set")
      }
    })
  })
  return (
    <div>
      {/* <ContentModal/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/" element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="chat" element={<Home/>}/>
            <Route path="explore" element={<Home/>}/>
            <Route path="notifications" element={<Home/>}/>
            <Route path="create" element={<PrivateRoute><CreateMenu/></PrivateRoute>}>
              <Route index element={<PostPanel/>}/>
              <Route path="post" element={<PostPanel/>}/>
              <Route path="recipe" element={<RecipePanel/>}/>
              <Route path="tips" element={<TipsPanel/>}/>
            </Route>
            <Route path="setting" element={<PrivateRoute><Setting/></PrivateRoute>}>
              <Route index element={<NotificationPanel/>}/>
              <Route path="notification" element={<NotificationPanel/>}/>
              <Route path="privacy" element={<PrivacyPanel/>}/>
              <Route path="logout" element={<LogoutPanel/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
