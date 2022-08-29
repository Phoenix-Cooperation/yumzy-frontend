import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import { CREATE_POST } from "../../api/mutations";
import {ReactComponent as Xmark} from "../../assets/images/icons/x-mark.svg";
import _ from "lodash";
import Compress from "compress.js";
import ImageUpload from "./ImageUpload";
import { uploadToS3 } from "./uploadToS3";


const PostPanel = () => {

  // Initialization - image resizer
  const compress = new Compress();
  const imageInput = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageObjects, setImageObjects] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [tags, setTags] = useState([]);

  /**
   * error messages
   * */
  const [errorImageUpload, setErrorImageUpload] = useState([]);
  const [createPost, {error}] = useMutation(CREATE_POST);

  const handleErrorImageUpload = (error) => {
    setErrorImageUpload((prev) => [...prev, error ])
  }

  const handleImageObjectsChange = ({file, imageURL}) => {
    setImageObjects((prev) => [...prev, {file, imageURL}])
  }

  /**
   * remove selected image from array
   * */
  const removeFileArrayValue = (index) => {
    setImageObjects(imageObjects.filter(image => image !== imageObjects[index]));
  }

  /**
   * post content submit function
   * */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const [images, errors] = await uploadToS3(imageObjects)
    // setUploadedImages(images);
    console.log(images, "uploadedImages");
    console.log(errors, "errors");
    if (errors.length >= 1) {
      console.log("error in uploading images")
    }


    const post = await createPost({
      variables: {
        postInput: {
          title,
          description,
          images,
          tags,
        }
      }
    })

    if (error) {
      console.error("error uploading images", error)
    }

    console.log(post)
  }
  return (
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Post</h1>
      </div>

      <form className="createContent__form" onSubmit={handleSubmit}>

        <label className="createContent__form__titleLabel">Title</label>
        <input 
          className="createContent__form__titleInput" 
          type="text" 
          name="title"
          onChange={(event) => {
              setTitle(event.target.value)
            }}
          />


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
          <ImageUpload
            handleErrors={handleErrorImageUpload}
            handleImageChange={handleImageObjectsChange}
          />
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
              )}
          </div>
        </div>
        
        <label
          className="createContent__form__tagsLabel"
          htmlFor="tags">
            Tags
        </label>
        <input
          className="createContent__form__tagsInput"
          type="text"
          id="tags"
          name="tags"
          onChange={(event) => {
            const { value } = event.target;
            const tempTags = value.split(" ")
            setTags(tempTags)
          }}/>

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

export default PostPanel;
