import React, { useEffect, useState } from "react";
import { Card, Carousel, Col } from "react-bootstrap";
import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as YummyFill } from "../../assets/images/icons/emoticon-tongue-fill.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"
import { postComponentProps } from "../../types/component.proptypes";
import { useMutation } from "@apollo/client";
import { REACT_TO_CONTENT, UN_REACT_TO_CONTENT } from "../../api/mutations";
import millify from "millify";

// eslint-disable-next-line react/display-name
const PostComponent = (props) => {

  const { handleShowContentActions, data : { id } } = props
  const [isReact, setIsReact] = useState(false);
  const [postReactCount, setPostReactCount] = useState(0);
  const [postCommentCount, setPostCommentCount] = useState(0);
  // eslint-disable-next-line no-undef
  const s3Url = process.env.REACT_APP_S3_IMAGE_URL;
  const [reactToPost] = useMutation(REACT_TO_CONTENT);
  const [unReactToPost] = useMutation(UN_REACT_TO_CONTENT);

  useEffect(() => {
    if (props.data.currentUserReacted) {
      setIsReact(true);
    } else {
      setIsReact(false);
    }
    if (props.data.reactCount > 0) {
      setPostReactCount(props.data.reactCount)
    } else {
      setPostReactCount(0);
    }

    if (props.data.commentCount > 0) {
      setPostCommentCount(props.data.commentCount);
    } else {
      setPostCommentCount(0);
    }
    console.log(props.data, "main");
  }, [props.data])
  const reactToContent = async () => {
    const react = await reactToPost({
      variables: {
        contentId: props.data.id
      }
    })
    console.log(react);
    setIsReact(true);
    setPostReactCount(postReactCount + 1);
  }

  const unReactToContent = async () => {
    const unreact = await unReactToPost({
      variables: {
        contentId: props.data.id
      }
    })
    console.log(unreact);
    setIsReact(false);
    setPostReactCount(postReactCount - 1);
  }

  const handleReact = () => {
    if (isReact) {
      unReactToContent()
    } else {
      reactToContent()
    }

  }
  return (
    <Col>
      <Card className="post" >
        <Card.Header>
          {props.data.user.photoURL !== null || props.data.user.photoURL !== undefined ? <img
            className="post__avatar"
            src={props.data.user.photoURL}
            alt="First slide"
          /> : <User className="post__avatar" />}
          {props.data.user.username}
          <Menu
            className="post__menu"
            onClick={() => {handleShowContentActions(id)}} />
        </Card.Header>
        <div onClick={() => props.handlePopup()}>
          <Carousel variant="dark" className="post__image">
            {
              props.data.images.map((image, index) => (
                <Carousel.Item key={props.data.id + index}>
                  <img
                    className=""
                    src={s3Url + image}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))
            }
          </Carousel>
        </div>
        <Card.Body>
          <div onClick={() => props.handlePopup()}>
            <Card.Title>{props.data.title}</Card.Title>
            <Card.Text>
              {props.data.description}
            </Card.Text>
          </div>
          <div className="post__reactspannel">
            <span onClick={handleReact}>
              {isReact ? <YummyFill className="post__fillreacts" /> : <Yummy className="post__reacts" />}
              <span>{millify(postReactCount)}</span>
            </span>
            <Comment className="post__reacts" /><span>{millify(postCommentCount)}</span>
            <Bookmark className="post__reacts" />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
PostComponent.propTypes = postComponentProps;
export default PostComponent;