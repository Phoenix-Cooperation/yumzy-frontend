import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query getAllRecipes($pageSize: Int!) {
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

export const GET_CONTENT = gql`
  query getContent($pageSize: Int!, $after: Int) {
    getContent(pageSize: $pageSize, after: $after) {
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