import React, { useState, useEffect, useRef } from "react"

import { gql, useQuery } from "@apollo/client";
import { CSSTransition } from "react-transition-group";

import ProfilePic from "../../assets/images/icons/profile.svg"
import DropdownContent from "./DropdownContent";

const AvatarDropdown = () => {

  const [showDropDown, setShowDropDown] = useState(false);
  const [dropDownHeight, setDropDownHeight] = useState(null);
  const [dropDownWidth, setDropDownWidth] = useState(null);
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    setUser(data?.user)
  })
  
  function calcHeight(el) {
    console.log(el.offsetWidth * 0.2, "offset width")
    console.log(el.offsetWidth, "offset width")
    const height = el.offsetHeight + el.offsetHeight * 0.09;
    const width = el.offsetWidth + el.offsetWidth * 0.2;

    if (width > 180) {
      setDropDownWidth(240);
    } else {
      setDropDownWidth(180)
    }

    
    setDropDownHeight(height);
  }

  const handleShowDropDown = () => {
    console.log("dropdown")
    setShowDropDown(!showDropDown)
    setDropDownHeight(0)
  }

  
  return (
    <div className="avatarDropDown">
      <div className="avatarDropDown__avatar" onClick={handleShowDropDown}>
        {user && user.photoURL ? 
          (<img src={user.photoURL} alt="dp" referrerPolicy="no-referrer"/>) :
          (<img src={ProfilePic} alt="dp" />)
        }
      </div>

      <div className="avatarDropDown__dropDown" style={{ height: dropDownHeight, display: showDropDown ? "block" : "none", width: dropDownWidth }} ref={dropdownRef}>
        <CSSTransition
          in={showDropDown}
          timeout={5000}
          classNames="avatarDropDown__dropDown__group"
          unmountOnExit
          onEnter={calcHeight}
          // onExited={calcHeight}
        >
          <DropdownContent user={user}/>
        </CSSTransition>
      </div>
    </div>
  )
}

export default AvatarDropdown