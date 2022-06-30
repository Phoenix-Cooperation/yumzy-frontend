import React, { useState, useRef } from "react"
import { useMutation } from "@apollo/client";
import {CREATE_TIP} from "../../Graphql/mutations/contentCreateMutation";

const TipsPanel = () => {
  const [title, setTitle] = useState("");
  const [tips, setTips] = useState("");
  const [images, setImages] = useState("");

  const [createTip, {error}] = useMutation(CREATE_TIP);

  const imageInput = useRef();

  const focusImageUploadInput = () => {
    imageInput.current.click();
  }

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
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Tip</h1>
      </div>
      <form className="createContent__form" onSubmit={handleSubmit}>

        <label 
          className="createContent__form__titleLabel" 
          htmlFor="title"
        >
            Title
        </label>
        <input 
          className="createContent__form__titleInput" 
          type="text" 
          id="title" 
          name="title"
          onChange={(event) => {
            setTitle(event.target.value)
          }}/>
        
        <label
          className="createContent__form__tipsLabel" 
          htmlFor="tips"
        >
          Tips
        </label>
        <textarea
          className="createContent__form__tipsInput" 
          type="text" 
          id="tips" 
          name="tips"
          onChange={(event) => {
            setTips(event.target.value)
          }}/>
        

        <label 
          className="createContent__form__imagesLabel"
          htmlFor="images">Images</label>
        <input
          hidden
          ref={imageInput}
          className="createContent_form_imagesInput"
          type="file"
          name="image"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={onImageChange} />
        <div
          className="createContent__form__imagesInput"
          onClick={focusImageUploadInput}>
            UPLOAD
        </div>

        <button 
          className="createContent__form__submit" 
          type="submit" 
          value="Submit"
        >Submit</button>
      </form>
    </div>
  )
}

export default TipsPanel
