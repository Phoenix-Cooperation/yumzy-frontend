import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../../Graphql/mutations/contentCreateMutation";

const PostPanel = () => {

  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [createPost, {error}] = useMutation(CREATE_POST);

  /**
   * image validation and assign to variable
   * */
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // let img = event.target.files[0];
      setImages(event.target.files);
    }
    
  };

  console.log(images);
  const imageInput = useRef();

  const focusImageUploadInput = () => {
    imageInput.current.click();
  }

  /**
   * post content submit function
   * */
  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      variables: {description: description, images: images},
    }).then();
  }
  return (
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Post</h1>
      </div>
      
      <form className="createContent__form" onSubmit={handleSubmit}>

        <label className="createContent__form__titleLabel">Title</label>
        <input className="createContent__form__titleInput" type="text" name="title" />

        
        <label 
          className="createContent__form__descriptionLabel" 
          htmlFor="description"
        >
            Description
        </label>
        
        <textarea 
          className="createContent__form__descriptionInput" 
          rows="4"
          id="description" 
          name="description"
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />
       
        <label 
          className="createContent__form__imagesLabel"
          htmlFor="images">Images</label>
        <input
          hidden
          ref={imageInput}
          className="createContent_form_imagesInput"
          type="file"
          // webkitdirectory="true"
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
  );
}

export default PostPanel
