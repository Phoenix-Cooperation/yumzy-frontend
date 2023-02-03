/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Modal  from "react-bootstrap/Modal"
import Col  from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

import { ReactComponent as User } from "../../assets/images/icons/account.svg"
import { ReactComponent as Menu } from "../../assets/images/icons/dots-vertical.svg"
import { ReactComponent as Yummy } from "../../assets/images/icons/emoticon-tongue.svg"
import { ReactComponent as Comment } from "../../assets/images/icons/comment-processing.svg"
import { ReactComponent as Bookmark } from "../../assets/images/icons/bookmark-outline.svg"
import { ReactComponent as YummyFill } from "../../assets/images/icons/emoticon-tongue-fill.svg"

import {useMutation} from "@apollo/client";
import {REACT_TO_CONTENT, UN_REACT_TO_CONTENT} from "../../api/mutations";

import millify from "millify";
import CommentSection from "./CommentSection";
import { Row } from "react-bootstrap";
const ContentModal = ({ show, handleHide, contentData }) => {

  // eslint-disable-next-line no-undef
  const s3Url = process.env.REACT_APP_S3_IMAGE_URL;

  const [isReact, setIsReact] = useState(false);
  const [postReactCount, setPostReactCount] = useState(0);
  const [reactToPost] = useMutation(REACT_TO_CONTENT);
  const [unReactToPost] = useMutation(UN_REACT_TO_CONTENT)

  useEffect(() => {
    if(contentData.currentUserReacted) {
      setIsReact(true);
    } else {
      setIsReact(false);
    }
    if(contentData.reactCount > 0) {
      setPostReactCount(contentData.reactCount)
    } else {
      setPostReactCount(0);
    }
  },[contentData])


  const reactToContent = async () => {
    const react = await reactToPost({
      variables: {
        contentId: contentData.id
      }
    })
    console.log(react);
    setIsReact(true);
    setPostReactCount(postReactCount + 1);
  }

  const unReactToContent = async () => {
    const unreact = await unReactToPost({
      variables: {
        contentId: contentData.id
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
  // const [ show, setShow ] = useState(false);

  // const handleShow = (val) => setShow(val);
  return (
    <>
      {/* <Button onClick={() => handleShow(true)}>show</Button> */}
      <Modal
        show={show}
        onHide={handleHide}
        dialogClassName="contentModal--width"
      >
        <Modal.Header>
          <Modal.Title>
            {contentData.user.photoURL !== null || contentData.user.photoURL !== undefined ? 
              (<img className="contentModal__avatar" src={contentData.user.photoURL} alt="First slide" />) : 
              (<User className="contentModal__avatar"/>)}
            {contentData.user.username}
            <Menu className="contentModal__menu"/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Card>
                <Carousel variant="dark" className="contentModal__corousel">
                  {
                    contentData.images.map((image, index) => (
                      <Carousel.Item key={contentData.id + index}>
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
                  <Card.Title>{contentData.title}</Card.Title>
                  <Card.Text>
                    {contentData.description}
                  </Card.Text>
                  <div className="contentModal__reactspannel">
                    <span onClick={handleReact}>
                      {isReact ? <YummyFill className="contentModal__fillreacts"/> : <Yummy className="contentModal__reacts"/>}
                      <span>{millify(postReactCount)}</span>
                    </span>
                    <Comment className="contentModal__reacts"/><Bookmark className="contentModal__reacts"/>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <CommentSection/>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ContentModal