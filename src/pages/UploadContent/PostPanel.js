import React, {useState} from "react"
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
      let img = event.target.files[0];
      setImages(img);
    }
  };

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
    <div className="createPostPanel">
      <h1>Add New Post</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="row-input">
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <input type="text" id="description" name="description"
              placeholder="Description" onChange={(event) => {
                setDescription(event.target.value)
              }}/>
          </div>
        </div>
        <div className="row-input">
          <div>
            <label htmlFor="images">Images</label>
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={onImageChange} />
          </div>
        </div>
        <box>
          <input type="submit" value="Submit"/>
        </box>
      </form>
    </div>
  );
}

export default PostPanel
