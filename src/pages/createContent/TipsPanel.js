import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import { CREATE_TIPS } from "../../api/mutations";
import { uploadToS3 } from "./uploadToS3";
import ImageUpload from "./ImageUpload";

import {ReactComponent as Xmark} from "../../assets/images/icons/x-mark.svg";

const TipsPanel = () => {

  // Initialization - image resizer
  const [title, setTitle] = useState("");
  const [tips, setTips] = useState("");
  const [imageObjects, setImageObjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  /**
   * error messages
   * */
  const [errorImageUpload, setErrorImageUpload] = useState("");

  const [createTips, {error}] = useMutation(CREATE_TIPS);

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

    event.preventDefault();
    const [images, errors] = await uploadToS3(imageObjects)
    console.log(images, "uploadedImages");
    console.log(errors, "errors");
    if (errors.length >= 1) {
      console.log("error in uploading images")
    }

    // setUploadedImages(images)

    const tipsRes = await createTips({
      variables: { 
        tipsInput: {
          title,
          tips,
          images,
          tags,
        }
      }
    })

    if (error) {
      console.error("error in saving post", error)
    }

    console.log(tipsRes)
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
                <div key={index + "image-view-parent"}  className="createContent__form__imagesUploadMain__imageView__image">
                  <img
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
          value="Submit"
        >Submit
        </button>
      </form>
    </div>
  )
}

export default TipsPanel
