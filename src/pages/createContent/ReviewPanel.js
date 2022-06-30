import React, {useState} from "react"
import {CREATE_REVIEW} from "../../../Graphql/mutations/contentCreateMutation";
import {useMutation} from "@apollo/client";

const ReviewPanel = () => {
  const [title, setTitle] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [review, setReview] = useState("");

  const [createReview, {error}] = useMutation(CREATE_REVIEW);


  const handleSubmit = (event) => {
    event.preventDefault();
    createReview({
      variables: {
        title: title,
        restaurant: restaurant,
        review: review
      },
    }).then();
  }

  return (
    <div className="createTipsPanel">
      <h1>Add New Review</h1>
      <form action="" onSubmit={handleSubmit}>
        <box>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value)
            }}/>
        </box>
        <box>
          <label htmlFor="restaurant">Restuarant</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            placeholder="Restaurant"
            onChange={(event) => {
              setRestaurant(event.target.value)
            }}/>
        </box>
        <box>
          <label htmlFor="review">Review</label>
          <input
            type="text"
            id="review"
            name="review"
            placeholder="Images"
            onChange={(event) => {
              setReview(event.target.value)
            }}/>
        </box>
        <box>
          <input type="submit" value="Submit"/>
        </box>
      </form>
    </div>
  )
}

export default ReviewPanel
