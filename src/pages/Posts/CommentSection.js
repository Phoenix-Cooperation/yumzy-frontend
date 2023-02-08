/* eslint-disable react/prop-types */
import React, {useEffect, useState} from "react"
import {Col, Row} from "react-bootstrap";
import { ReactComponent as Send } from "../../assets/images/icons/send.svg"
import Comment from "./SingleComment/Comment";
import {useMutation} from "@apollo/client";
import {ADD_COMMENT} from "../../api/mutations";

const CommentSection = ({ contentId,comments,handleCommentFetchMore }) => {
    
  const [postComments, setPostComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);

  const handleChange = event => {
    setInputComment(event.target.value);
  };


  useEffect(() => {
    setPostComments(comments);
    console.log(comments);
  },[comments])
  const handleAddComment = async () => {
    setPostComments([...postComments,inputComment])
    const res = await addComment({
      variables: {
        comment:inputComment,
        contentId:contentId
      }
    })
    if (res.data.addComment.message === "success") {
      setInputComment("");
      handleCommentFetchMore();
    }
  }

  return (
    <div className="commentsSection">
      <div>
        <div className="commentsSection__comments">
          {postComments.map((comment,index) => (
            <div key={index}>
              {comment.user !== undefined && comment.comment !== "" &&
              <Comment key={index} comment={comment} />
              }
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="commentsSection__input">
          <Col md={11}><input type="text" className="" onInput={handleChange} value={inputComment}/></Col>
          <Col md={1}><span onClick={handleAddComment}><Send className="commentsSection__input_send"/></span></Col>
        </div>
      </div>
    </div>
  )
}

export default CommentSection;