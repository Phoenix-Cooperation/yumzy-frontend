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
             content {
                id
                type
                title
                description
                ingredients
                images
                method
                time
                tips
                tags
                user {
                  id
                  username
                  email
                  user_id
                  photoURL
                }
              }
             hasMore
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