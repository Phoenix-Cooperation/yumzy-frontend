/* eslint-disable react/prop-types */
import React from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/firebase-auth";

const DropdownContent = ({ user }) => {
  const navigate = useNavigate()
  return (
    <div>
      {user?.username ? (
        <div>
          <div className="avatarDropDown__dropDown__item__container">
            <div className="avatarDropDown__dropDown__item avatarDropDown__dropDown__item__username">
              <img src={user.photoURL}/>
              {user?.username}
            </div>
          </div>
          <div className="avatarDropDown__dropDown__item">View Profile</div>
          <div className="avatarDropDown__dropDown__item">Settings</div>
          <div className="avatarDropDown__dropDown__item">Help</div>
          <div className="avatarDropDown__dropDown__item" 
            onClick={() => {
              logout();
              navigate("/auth")
            }}
          >
            Sign Out
          </div>
        </div>
      ) :
        (
          <div>
            <div className="avatarDropDown__dropDown__item">Help</div>
            <div className="avatarDropDown__dropDown__item"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </div>
          </div>
        )}
      <span></span>
    </div>
  )
}

export default DropdownContent