import React, {useState} from "react"
import { useMutation } from "@apollo/client";
import {CREATE_TIP} from "../../Graphql/mutations/contentCreateMutation";

const TipsPanel = () => {
  const [title, setTitle] = useState("");
  const [tips, setTips] = useState("");
  const [images, setImages] = useState("");

  const [createTip, {error}] = useMutation(CREATE_TIP);

  /**
   * image validation and assign to variable
   * */
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImages(img);
    }
  };

  /**
   * post content submit function
   * */
  const handleSubmit = (event) => {
    event.preventDefault();
    createTip({
      variables: {
        title: title,
        tips: tips,
        images: images
      },
    }).then();
  }

  return (
    <div className="createTipsPanel">
      <h1>Add New Tip</h1>
      <form action="" onSubmit={handleSubmit}>
        <box>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title"
            placeholder="Title" onChange={(event) => {
              setTitle(event.target.value)
            }}/>
        </box>
        <box>
          <label htmlFor="tips">Tips</label>
          <input type="text" id="tips" name="tips"
            placeholder="Tips" onChange={(event) => {
              setTips(event.target.value)
            }}/>
        </box>
        <box>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            name="image"
            onChange={onImageChange} />
        </box>
        <box>
          <input type="submit" value="Submit"/>
        </box>
      </form>
    </div>
  )
}

export default TipsPanel
