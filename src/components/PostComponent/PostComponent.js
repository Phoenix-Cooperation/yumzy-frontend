import React from "react";
import {Card, Carousel, Col} from "react-bootstrap";
import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"
import {postComponentProps} from "../../types/component.proptypes";

// eslint-disable-next-line react/display-name
const PostComponent = (props) => {

  // eslint-disable-next-line no-undef
  const s3Url = process.env.REACT_APP_S3_IMAGE_URL;

  return (
    <div>
      <Col>
        <Card className="post">
          <Card.Header>{props.data.user.photoURL !== null || props.data.user.photoURL !== undefined ? <img
            className="post__avatar"
            src={props.data.user.photoURL}
            alt="First slide"
          /> : <User className="post__avatar"/>}{props.data.user.username}<Menu className="post__menu"/></Card.Header>
          <Carousel variant="dark" className="post__image">
            {
              props.data.images.map((image, index) => (
                <Carousel.Item key={props.data.id + index}>
                  <img
                    className=""
                    src={s3Url+image}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))
            }
          </Carousel>
          <Card.Body>
            <Card.Title>{props.data.title}</Card.Title>
            <Card.Text>
              {props.data.description}
            </Card.Text>
            <Yummy className="post__reacts"/><Comment className="post__reacts"/><Bookmark className="post__reacts"/>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};
PostComponent.propTypes = postComponentProps;
export default PostComponent;