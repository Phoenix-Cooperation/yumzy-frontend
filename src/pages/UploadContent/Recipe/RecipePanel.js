import React, {useState} from "react"
import {useMutation} from "@apollo/client";
import {CREATE_RECIPE} from "../../../Graphql/mutations/contentCreateMutation";

const RecipePanel = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [images, setImages] = useState("");
  const [method, setMethod] = useState("");
  const [time, setTime] = useState("");

  const [createRecipe, {error}] = useMutation(CREATE_RECIPE);

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
    <div className="createPostPanel">
      <h1>Add New Recipe</h1>
      <form action="" onSubmit={handleSubmit}>
        <box>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title"
                 placeholder="Title" onChange={(event) => {
            setTitle(event.target.value)
          }}/>
        </box>
        <box>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description"
                 placeholder="Description" onChange={(event) => {
            setDescription(event.target.value)
          }}/>
        </box>
        <box>
          <label htmlFor="ingredient">Ingredient</label>
          <input type="text" id="ingredient" name="ingredient"
                 placeholder="Ingredient" onChange={(event) => {
            setIngredient(event.target.value)
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
          <label htmlFor="method">Method</label>
          <input type="text" id="method" name="method"
                 placeholder="Method" onChange={(event) => {
            setMethod(event.target.value)
          }}/>
        </box>
        <box>
          <label htmlFor="time">Time</label>
          <input type="text" id="time" name="time"
                 placeholder="Time" onChange={(event) => {
            setTime(event.target.value)
          }}/>
        </box>
        <box>
          <input type="submit" value="Submit"/>
        </box>
      </form>
    </div>
  )
}

export default RecipePanel
