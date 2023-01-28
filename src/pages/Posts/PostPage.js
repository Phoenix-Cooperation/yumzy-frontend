import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import PostComponent from "../../components/PostComponent/PostComponent";
import { GET_CONTENT } from "../../Graphql/Queries/getPostQueries"
import {useQuery} from "@apollo/client";

const PostPage = () => {

  const [postData,setPostData] = useState([]);
  const { data } = useQuery(GET_CONTENT, {variables: {pageSize: 10}});
  // const [listItems, setListItems] = useState(Array.from(Array(30).keys(), n => n + 1));
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      return
    } else {
      const dataList = useQuery(GET_CONTENT, {variables: {pageSize: 10}});
      setPostData(dataList.getContent)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    console.log(data);
    if(data !== undefined) {
      setPostData(data.getContent);
    }
  },[data])


  return (
    <Row>
      {postData.map((data) => (
        <div key={data.id}>
          <PostComponent data = {data}/>
        </div>
      ))}
      {/*<RecipiePost title="Ramen Recipie" description="asdjaj ioajsdkasj aodjlasjd adasjkdj" time="10 minutes"/>*/}
    </Row>
  );
};

export default PostPage;