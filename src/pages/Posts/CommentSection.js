import React from "react"

const CommentSection = ({ comments }) => {
  return (
    <div className="commentSection">
      <div className="commentSection__comments">
        <div className="commentSection_singleComment">
          
        </div>
      </div>
      <div className="commentSection__input">
        <input type="text"/>
      </div>
    </div>
  )
}

export default CommentSection;