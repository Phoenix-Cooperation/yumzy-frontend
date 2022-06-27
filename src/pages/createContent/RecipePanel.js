import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import Compress from "compress.js";
import {CREATE_RECIPE} from "../../Graphql/mutations/contentCreateMutation";

const RecipePanel = () => {

  /**
   * form variables
   * */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [images, setImages] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");

  /**
   * error messages
   * */
  const [errorImageUpload, setErrorImageUpload] = useState("");

  /**
   * GraphQL
   * */
  const [createRecipe, {error}] = useMutation(CREATE_RECIPE);

  const imageInput = React.useRef();

  // Initialization - image resizer
  const compress = new Compress();

  /**
   * image validation and assign to variable
   * */
  const onImageChange = (event) => {

    if (event.target.files && event.target.files.length > 0) {
      _.forEach(event.target.files, file => {

        if (!file) {
          setErrorImageUpload("Image is not valid");
          return;
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
          setErrorImageUpload("Image type is not valid");
          return;
        }

        if (file.size > 10e6) {
          setErrorImageUpload("Please upload a file smaller than 10 MB");
          return;
        }

        // to view uploaded images
        /**
         * {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." />
                    ))}
         * */
        setFileArray((prevState => [
          ...prevState, URL.createObjectURL(file)
        ]
        ));

        // to upload
        setImages((prevState => [
          ...prevState, resizeImageFn(file)
        ]
        ));

      });
    }
  };

  /**
   * image resize function
   * */
  async function resizeImageFn(file) {

    const resizedImage = await compress.compress([file], {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true // defaults to true, set false if you do not want to resize the image width and height
    });

    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)
    return resizedFile;
  }

  const focusImageUploadInput = () => {
    imageInput.current.click();
  }

  /**
   * post content submit function
   * */
  const handleSubmit = (event) => {
    event.preventDefault();
    createRecipe({
      variables: {
        title: title,
        description: description,
        ingredient: ingredient,
        images: images,
        method: method,
        time: time
      },
    }).then();
  }
  return (
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Recipe</h1>
      </div>
      <form className="createContent__form" onSubmit={handleSubmit}>
        
        <label className="createContent__form__titleLabel" htmlFor="title">Title</label>
        <input className="createContent__form__titleInput" type="text" id="title" name="title"
          onChange={(event) => {
            setTitle(event.target.value)
          }}/>
        
        
        <label 
          className="createContent__form__descriptionLabel" 
          htmlFor="description"
        >
          Description
        </label>
        <textarea type="text" id="description" name="description"
          onChange={(event) => {
            setDescription(event.target.value)
          }}/>
        
       
        <label htmlFor="ingredient">Ingredient</label>
        <input 
          className="createContent__form__descriptionInput"
          type="text" 
          id="ingredient" 
          name="ingredient"
          onChange={(event) => {
            setIngredient(event.target.value)
          }}/>
       
       
        <label 
          className="createContent__form__imagesLabel"
          htmlFor="images"
        >
          Images
        </label>
        <input
          hidden
          type="file"
          name="image"
          multiple
          accept=".jpg, .jpeg, .png"
          ref={imageInput}
          onChange={onImageChange}/>
        <div
          className="createContent__form__imagesInput"
          onClick={focusImageUploadInput}>
            UPLOAD
        </div>
        
        
        <label 
          className="createContent__form__methodLabel"
          htmlFor="method"
        >
          Method
        </label>
        <textarea 
          type="text" 
          id="method" 
          name="method"
          onChange={(event) => {
            setMethod(event.target.value)
          }}/>
      
        <label 
          className="createContent__form__timeLable"
          htmlFor="time"
        >
          Time
        </label>
        <input 
          className="createContent__form__timeInput"
          type="text" 
          id="time" 
          name="time"
          onChange={(event) => {
            setTime(event.target.value)
          }}/>
       
        <button 
          className="createContent__form__submit" 
          type="submit" 
          value="Submit"
        >Submit</button>
      </form>
    </div>
  )
}

export default RecipePanel
