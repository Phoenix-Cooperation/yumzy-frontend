import React from "react";
import {Row} from "react-bootstrap";
import PostComponent from "../../components/PostComponent/PostComponent";
import { GET_RECIPES } from "../../Graphql/Queries/getPostQueries"
import {useQuery} from "@apollo/client";

const PostPage = () => {

  const { data,error } = useQuery(GET_RECIPES, {variables: {pageSize: 10}});

  console.log(error,data);

  return (
    <Row>
      <PostComponent data = {data}/>
      {/*<RecipiePost title="Ramen Recipie" description="asdjaj ioajsdkasj aodjlasjd adasjkdj" time="10 minutes"/>*/}
    </Row>
  );
};

export default PostPage;