/* eslint-disable react/prop-types */
import React from "react";
import {Col} from "react-bootstrap";
import { ReactComponent as User } from "../../../assets/images/icons/account.svg"

const Comment = ({comment}) => {

  return (
    <div className="comment__box">
      <Col md={1} className="comment__avatarCol">
        <div>
          {comment.user.photoURL !== null || comment.user.photoURL !== "" || comment.user.photoURL !== undefined ?
            (<img className="comment__avatar" src={comment.user.photoURL} alt="" />) :
            (<User className="comment__avatar"/>)}
        </div>
      </Col>
      <Col md={10} className="comment__commentCol">
        <span className="comment__userName">{comment.user.username}</span>
        <span className="comment__comment">{comment.comment}</span>
      </Col>
    </div>
  );
};

export default Comment;