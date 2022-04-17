import React from "react"
import { gql, useQuery } from "@apollo/client";

import ProfilePic from "../../assets/images/icons/profile.svg"

const AvatarDropdown = () => {

  const GET_USER = gql`
    query GetUser {
      user @client
    }
  `

  const { data } = useQuery(GET_USER);

  return (
    <div className="avatarDropdown">
      {data?.user && data.user.photoURL ? 
        (<img src={data.user.photoURL} alt="dp" referrerPolicy="no-referrer"/>) :
        (<img src={ProfilePic} alt="dp" />)
      }
    </div>
  )
}

export default AvatarDropdown