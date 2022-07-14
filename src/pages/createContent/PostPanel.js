import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import {CREATE_POST} from "../../Graphql/mutations/contentCreateMutation";
import {ReactComponent as Xmark} from "../../assets/images/icons/x-mark.svg";
import _ from "lodash";
import Compress from "compress.js";


const PostPanel = () => {

  // Initialization - image resizer
  const compress = new Compress();
  const imageInput = useRef();
  const [description, setDescription] = useState("");
  const [imageObjects, setImageObjects] = useState([]);

  /**
   * error messages
   * */
  const [errorImageUpload, setErrorImageUpload] = useState("");
  const [createPost, {error}] = useMutation(CREATE_POST);

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

        // updates model
        setImageObjects((prevState => [
            ...prevState, {file: resizeImageFn(file), imageURL: URL.createObjectURL(file)}
          ]
        ));
      });
    }
  };

  const focusImageUploadInput = () => {
    imageInput.current.click();
  }

  /**
   * remove selected image from array
   * */
  const removeFileArrayValue = (index) => {
    setImageObjects(imageObjects.filter(image => image !== imageObjects[index]));
  }

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

  /**
   * post content submit function
   * */
  const handleSubmit = (event) => {
    event.preventDefault();
    createPost({
      variables: {description: description, images: imageObjects},
    }).then();
  }
  return (
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Post</h1>
      </div>

      <form className="createContent__form" onSubmit={handleSubmit}>

        <label className="createContent__form__titleLabel">Title</label>
        <input className="createContent__form__titleInput" type="text" name="title"/>


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
          htmlFor="images">
          Images
        </label>
        <div className="createContent__form__imagesUploadMain">
          <input
            hidden
            type="file"
            name="image"
            multiple
            accept=".jpg, .jpeg, .png"
            ref={imageInput}
            onChange={onImageChange}/>
          <div
            className="createContent__form__imagesUploadMain__imagesInput"
            onClick={focusImageUploadInput}>
            UPLOAD
          </div>
          <div className="createContent__form__imagesUploadMain__imageView">
            {
              imageObjects.map((image, index) => (
                  <div key={index + "image-view-parent"}>
                    <img
                      className="createContent__form__imagesUploadMain__imageView__image"
                      key={index + "image"}
                      src={image.imageURL}
                      alt="..."/>
                    <Xmark onClick={() => removeFileArrayValue(index)}/>
                  </div>
                )
              )
            }
          </div>
        </div>

        <button
          className="createContent__form__submit"
          type="submit"
          value="Submit">
          Submit
        </button>

      </form>
    </div>
  );
}

export default PostPanel
