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
                commentCount
                user {
                  username
                  email
                  user_id
                  photoURL
                }
                reactCount
                currentUserReacted
              }
             hasMore
        }
  }
 `;

export const GET_CONTENT_BY_USER = gql`
  query getContentUserId($pageSize: Int!, $after: Int) {
    getContentUserId(pageSize: $pageSize, after: $after) {
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
                commentCount
                user {
                  username
                  email
                  user_id
                  photoURL
                }
                reactCount
                currentUserReacted
              }
             hasMore
        }
  }
 `;

export const GET_COMMENTS = gql`
  query getComments($contentId: ID) {
   getComments(contentId: $contentId) {
      id
      comment
      user {
        username
        email
        user_id
        photoURL
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