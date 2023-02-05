/* eslint-disable react/prop-types */
import React from "react";
import {Col, Row} from "react-bootstrap";
import { ReactComponent as User } from "../../../assets/images/icons/account.svg"

const Comment = ({comment}) => {

  return (
    <div className="comment__box">
      <Row className="comment__commentbox">
        <Col md={1} className="comment__column">{comment.user.photoURL !== null || comment.user.photoURL !== "" || comment.user.photoURL !== undefined ?
          (<img className="comment__avatar" src={comment.user.photoURL} alt="" />) :
          (<User className="comment__avatar"/>)}</Col>
        <Col md={8} className="comment__column"><span className="comment__userName">{comment.user.username}</span></Col>
      </Row>
      <Row>
        <span className="comment__comment">{comment.comment}</span>
      </Row>
    </div>
  );
};

export default Comment;