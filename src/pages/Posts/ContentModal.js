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

import {useMutation, useQuery} from "@apollo/client";
import {REACT_TO_CONTENT, UN_REACT_TO_CONTENT} from "../../api/mutations";

import millify from "millify";
import CommentSection from "./CommentSection";
import { Row } from "react-bootstrap";
import {GET_COMMENTS} from "../../Graphql/Queries/getPostQueries";
const ContentModal = ({ show, handleHide, contentData }) => {

  // eslint-disable-next-line no-undef
  const s3Url = process.env.REACT_APP_S3_IMAGE_URL;

  const [isReact, setIsReact] = useState(false);
  const [postReactCount, setPostReactCount] = useState(0);
  const [postCommentCount, setPostCommentCount] = useState(0);
  const [comments, setComments] = useState(undefined);
  const [reactToPost] = useMutation(REACT_TO_CONTENT);
  const [unReactToPost] = useMutation(UN_REACT_TO_CONTENT)
  const { data,fetchMore } = useQuery(GET_COMMENTS, {variables: {contentId: contentData.id}});

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
    if (contentData.commentCount > 0) {
      setPostCommentCount(contentData.commentCount)
    } else {
      setPostCommentCount(0);
    }
    console.log("model",contentData)
  },[contentData])

  useEffect(() => {
    if (data !== undefined && data.getComments !== undefined) {
      setComments(data.getComments);
    }
  },[data])

  const handleFetchMoreComment = async () => {
    console.log("fetching");
    const { data, loading , error  } = await fetchMore({
      variables: { after: contentData.id }
    })

    if (data !== undefined) {
      console.log(data.getComments, "new comments");
      setComments([...comments,...data.getComments]);
    }
  }
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
        className="contentModal__model"
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
          <Row className="d-flex justify-content-around">
            <Col md={7} className="contentModal__contentSection ">
              <Card className="contentModal__contentCard">
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
                    <Comment className="contentModal__reacts"/><span>{millify(postCommentCount)}</span>
                    <Bookmark className="contentModal__reacts"/>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="contentModal__commentSection">
              {comments !== undefined && <CommentSection contentId={contentData.id} comments={comments} handleCommentFetchMore={() => handleFetchMoreComment()}/>}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ContentModal