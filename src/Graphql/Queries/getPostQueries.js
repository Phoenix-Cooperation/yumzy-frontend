import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query getAllRecipes(pageSize: Int!) {
    getAllRecipes(pageSize: $pageSize) {
        data {
              description
              id
              ingredients
              images
              method
              tags
              time
              title
            }
        }
  }
 `;

// export const GET_TIPS = gql`
//   query getAllTips(pageSize: Int!) {
//     data {
//       id
//       images
//       tags
//       tips
//       title
//     }
//   }`;