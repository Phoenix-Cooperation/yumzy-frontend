import React from "react";
import {Row} from "react-bootstrap";
// import RecipiePost from "../../components/PostInDetail/RecipiePost";
import PostComponent from "../../components/PostComponent/PostComponent";

const PostPage = () => {
  return (
    <Row>
      <PostComponent/>
      {/*<RecipiePost title="Ramen Recipie" description="asdjaj ioajsdkasj aodjlasjd adasjkdj" time="10 minutes"/>*/}
    </Row>
  );
};

export default PostPage;