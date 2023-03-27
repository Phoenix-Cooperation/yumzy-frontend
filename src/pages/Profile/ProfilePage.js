import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {
  return (
    <div>
      <ProfileInfo/>
      <hr/>
      <ProfileContent/>
    </div>
  );
};

export default ProfilePage;