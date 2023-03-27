// import photo from "../../assets/images/photo.jpg";
// import iconEdit from "../../assets/images/iconEdit.png";
import React , { useEffect, useState }from "react";

import { gql, useQuery } from "@apollo/client";

const ProfileInfo = () => {

  const [user, setUser] = useState(null);
  const GET_USER = gql`
    query GetUser {
      user @client
    }
  `
  const { data } = useQuery(GET_USER);

  useEffect(() => {
    setUser(data?.user)
  })
  return (    
    <div className="mainContainer mt-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-2" style={{paddingLeft: "30px"}}>
            <img className="profileImage" src={user?.photoURL}/>
          </div>
          <div className="col-sm-7" style={{paddingLeft: "20px"}}>
            <h2>{user?.username}</h2>
            <p>I am foodie from Sri Lanka and i like to cook food as a hobby. I am foodie from Sri Lanka and i like to cook food as a hobby.</p>
            <span className="status">14 posts | 50 followers | 50 points</span>
          </div>
          {/* <div className="col-sm-1" style={{paddingLeft: "10px"}}>
            <span><img src={iconEdit} className="editIcon"/></span>
          </div> */}
        </div>
      </div>
    </div>  
  );

}

export default ProfileInfo;