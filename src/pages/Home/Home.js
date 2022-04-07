import React, { useState, useEffect } from 'react'

import { logout } from "../../services/firebase-auth"
import PostPage from "../Posts/PostPage";
const Home = () => {
  // const [books, getBooks] = useState([])

  // const GET_BOOKS = gql`
  //   query GetBooks {
  //     books {
  //       title
  //     }
  //   }`

  // const { data, loading, error}  = useQuery(GET_BOOKS)
  // console.log(data);
  // console.log(error)

  
  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
      <PostPage/>
    </div>
  )
}

export default Home