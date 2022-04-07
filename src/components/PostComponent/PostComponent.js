import React from "react";
import {Card, Col} from "react-bootstrap";
import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"
import PostImg from "../../assets/images/PostImg.png";

const PostComponent = () => {
  return (
    <Col>
      <Card className="post">
        <Card.Header><User className="post__avatar"/>User Name<Menu className="post__menu"/></Card.Header>
        <Card.Img variant="top" src={PostImg} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card content.
          </Card.Text>
          <Yummy className="post__reacts"/><Comment className="post__reacts"/><Bookmark className="post__reacts"/>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PostComponent;