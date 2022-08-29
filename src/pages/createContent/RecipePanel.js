import React, {useState, useRef} from "react"
import {useMutation} from "@apollo/client";
import {ReactComponent as Xmark} from "../../assets/images/icons/x-mark.svg";
import { CREATE_RECIPE } from "../../api/mutations";
import { uploadToS3 } from "./uploadToS3";
import ImageUpload from "./ImageUpload";

const RecipePanel = () => {

  /**
   * form variables
   * */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [imageObjects, setImageObjects] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState([])

  /**
   * error messages
   * */
  const [errorImageUpload, setErrorImageUpload] = useState([]);

  /**
   * GraphQL
   * */
  const [createRecipe, {error}] = useMutation(CREATE_RECIPE);

  const ingredientRef = useRef();

  const addIngredient = () => {
    const ingredient = ingredientRef.current.value;
    if (ingredient !== "") {
      setIngredientsList((prev) => [...prev, ingredient])
    }
    ingredientRef.current.value = "";
  }

  const removeIngredient = (index) => {
    const tempIngredientList = [...ingredientsList];
    tempIngredientList.splice(index, 1)
    setIngredientsList(tempIngredientList);
  }
  

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
    console.log(images, "uploadedImages");
    console.log(errors, "errors");
    if (errors.length >= 1) {
      console.log("error in uploading images")
    }

    // setUploadedImages(images)

    console.log(uploadedImages)
    const recipe = await createRecipe({
      variables: {
        recipeInput: {
          title,
          description,
          ingredients: ingredientsList,
          images,
          method,
          time,
          tags,
        }
      }
    })

    if (error) {
      console.error("error in saving post", error)
    }
    console.log(recipe)
  }
  return (
    <div className="createContent">
      <div className="createContent__header">
        <h1>Add New Recipe</h1>
      </div>
      <form className="createContent__form" onSubmit={handleSubmit}>

        <label className="createContent__form__titleLabel"
          htmlFor="title">Title</label>
        <input className="createContent__form__titleInput"
          type="text"
          id="title"
          name="title"
          onChange={(event) => {
            setTitle(event.target.value)
          }}/>


        <label
          className="createContent__form__descriptionLabel"
          htmlFor="description">
          Description
        </label>
        <textarea type="text"
          id="description"
          name="description"
          onChange={(event) => {
            setDescription(event.target.value)
          }}/>


        <label className="createContent__form__ingredientLabel"
          htmlFor="ingredient">Ingredient</label>
        <span className="createContent__form__ingredientInput">
          <input
            type="text"
            name="ingredient"
            ref={ingredientRef}
          />
          <span
            className="createContent__form__ingredientInput__btn"
            onClick={addIngredient}>
            Add
          </span>
          <div className="createContent__form__ingredientInput__list">
            {ingredientsList.map((ingredient, index) => (
              <div key={index}>
                {ingredient}
                <Xmark onClick={() => removeIngredient(index)}/>
              </div>
            ))}
          </div>
        </span>


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
              )
            }
          </div>
        </div>

        <label
          className="createContent__form__methodLabel"
          htmlFor="method">
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
          className="createContent__form__timeLabe1"
          htmlFor="time">
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

export default RecipePanel
