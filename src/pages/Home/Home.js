import React from "react"

// import { logout } from "../../services/firebase-auth"
import PostPage from "../Posts/PostPage";
// import UploadMain from "../createContent/UploadMain";
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

  console.log("home")
  return (
    <div>
      {/* Home */}
      {/* <button onClick={logout}>Logout</button> */}
      {/*<UploadMain/>*/}
      <PostPage/>
    </div>
  )
}

export default Home
