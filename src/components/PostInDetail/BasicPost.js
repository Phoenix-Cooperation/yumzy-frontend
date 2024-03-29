import React, {useEffect, useState} from "react";
import {Card, Carousel, Modal} from "react-bootstrap";
import {basicPostProps} from "../../types/component.proptypes";
import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"
import { ReactComponent as YummyFill } from "../../assets/images/icons/emoticon-tongue-fill.svg"
import {useMutation} from "@apollo/client";
import {REACT_TO_CONTENT, UN_REACT_TO_CONTENT} from "../../api/mutations";
import millify from "millify";
const BasicPost = (props) => {
  const { show, handleHide } = props
  // eslint-disable-next-line no-undef
  const s3Url = process.env.REACT_APP_S3_IMAGE_URL;
  const [isReact, setIsReact] = useState(false);
  const [postReactCount, setPostReactCount] = useState(0);
  const [reactToPost] = useMutation(REACT_TO_CONTENT);
  const [unReactToPost] = useMutation(UN_REACT_TO_CONTENT);
  useEffect(() => {
    if(props.data.currentUserReacted) {
      setIsReact(true);
    } else {
      setIsReact(false);
    }
    if(props.data.reactCount > 0) {
      setPostReactCount(props.data.reactCount)
    } else {
      setPostReactCount(0);
    }
  },[props.data])
  const reactToContent = async () => {
    const react = await reactToPost({
      variables: {
        contentId:props.data.id
      }
    })
    console.log(react);
    setIsReact(true);
    setPostReactCount(postReactCount + 1);
  }

  const unReactToContent = async () => {
    const unreact = await unReactToPost({
      variables: {
        contentId:props.data.id
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
    <Modal size="lg" show={show} className="post" onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.data.user.photoURL !== null || props.data.user.photoURL !== undefined ? 
            (<img className="post__avatar" src={props.data.user.photoURL} alt="First slide" />) : 
            (<User className="post__avatar"/>)}
          {props.data.user.username}
          <Menu className="post__menu"/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
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
            <div className="post__reactspannel">
              <span onClick={handleReact}>
                {isReact ? <YummyFill className="post__fillreacts"/> : <Yummy className="post__reacts"/>}
                <span>{millify(postReactCount)}</span>
              </span>
              <Comment className="post__reacts"/><Bookmark className="post__reacts"/>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};
BasicPost.propTypes = basicPostProps;
export default BasicPost;