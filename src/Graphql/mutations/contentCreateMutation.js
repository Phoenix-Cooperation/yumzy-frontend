import {gql} from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost (
    $description: String!,
    $imageList: List!
  ) {
  createPost(
      description: $description,
      imageList: $imageList
      ) {
      status
      data
      message
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe (
    $title: String!,
    $description: String!,
    $ingredient: String!,
    $method: String!,
    $time: String!,
    $imageList: List!
  ) {
  createRecipe(
      title: $title,
      description: $description,
      ingredient: $ingredient,
      method: $method,
      time: $time,
      imageList: $imageList
      ) {
      status
      data
      message
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createRecipe (
    $title: String!,
    $restaurant: String!,
    $review: String!
  ) {
  createRecipe(
      title: $title,
      restaurant: $restaurant,
      review: $review
      ) {
      status
      data
      message
    }
  }
`;

export const CREATE_TIP = gql`
  mutation createPost (
    $title: String!,
    $tips: String!,
    $imageList: List!
  ) {
  createPost(
      title: $title,
      tips: $tips,
      imageList: $imageList
      ) {
      status
      data
      message
    }
  }
`;
