import React, { useRef } from "react"
import { resizeImageFn } from "./resizeImageFn"

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ handleErrors, handleImageChange }) => {
  
  const imageInput = useRef();

  const onImageChange = async (event) => {
    const files = event.target.files;
    console.log(`files ${files}`, files)
    if (files && files.length > 0) {
      await Promise.all(Array.from(files).map(async (file) => {
        if (!file) {
          handleErrors("Image is not valid");
          return;
        }

        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
          handleErrors("Image type is not valid");
          return;
        }

        if (file.size > 10e6) {
          handleErrors("Please upload a file smaller than 10 MB");
          return;
        }

        // updates model
        const resizedImage = await resizeImageFn(file)
        console.log(resizedImage);
        handleImageChange({file: resizedImage, imageURL : URL.createObjectURL(file)});
      }))
    }

  }

  const focusImageUploadInput = () => {
    imageInput.current.click();
  }
  return (
    <div style={{ cursor: "pointer" }}>
      <input 
        hidden
        type="file"
        name="image"
        multiple
        accept=".jpg, jpeg, .png"
        ref={imageInput}
        onChange={onImageChange}
      />
      <div
        onClick={focusImageUploadInput}
      >
        <span className="createContent__form__upload">
          Upload
        </span>
    
      </div>
    </div>
  )
}

export default ImageUpload