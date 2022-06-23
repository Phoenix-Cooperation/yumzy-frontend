import React, { useState, useEffect, useRef } from "react"
import { gql, useQuery } from "@apollo/client";
import { CSSTransition } from "react-transition-group";

import ProfilePic from "../../assets/images/icons/profile.svg"

const AvatarDropdown = () => {

  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownHeight, setDropDownHeight] = useState(null);
  const dropdownRef = useRef(null);

  const GET_USER = gql`
    query GetUser {
      user @client
    }
  `

  useEffect(() => {
    setDropDownHeight(0)
  }, [])

  const { data } = useQuery(GET_USER);
  
  function calcHeight(el) {
    const height = el.offsetHeight;
    console.log(height)
    setDropDownHeight(height);
  }

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown)
    setDropDownHeight(0)
  }

  console.log(showDropDown);
  return (
    <div className="avatarDropDown">
      <div className="avatarDropDown__avatar" onClick={handleShowDropDown}>
        {data?.user && data.user.photoURL ? 
          (<img src={data.user.photoURL} alt="dp" referrerPolicy="no-referrer"/>) :
          (<img src={ProfilePic} alt="dp" />)
        }
      </div>

      <div className="avatarDropDown__dropDown" style={{ height: dropDownHeight, display: showDropDown ? "block" : "none" }} ref={dropdownRef}>
        <CSSTransition
          in={showDropDown}
          timeout={500}
          classNames="avatarDropDown__dropDown__group"
          unmountOnExit
          onEnter={calcHeight}
          // onExited={calcHeight}
        >
          <div>
            <div>Settings</div>
            <div>My Profile</div>
            <div>Logout</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default AvatarDropdown