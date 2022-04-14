import React from "react";
import {Card, Carousel, Col} from "react-bootstrap";
import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"

const PostComponent = () => {
  return (
    <Col>
      <Card className="post">
        <Card.Header><User className="post__avatar"/>User Name<Menu className="post__menu"/></Card.Header>
        <Carousel variant="dark" className="post__image">
          <Carousel.Item>
            <img
              className=""
              src="https://www.inspiredtaste.net/wp-content/uploads/2019/04/Vegetable-Baked-Pasta-Recipe-1200.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className=""
              src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className=""
              src="https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-V2-bowl.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
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