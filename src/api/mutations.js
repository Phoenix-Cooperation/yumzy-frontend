import { gql } from "@apollo/client";

// export const CREATE_USER = gql`
//     mutation CREATE_USER($userName: String!, $email: String!, $id: String!) {
//         createUser(userName: $userName!, email: $email, id: $id) {
//             username
//         }
//     }
// `

export const CREATE_RECIPE = gql`
    mutation CREATE_RECIPE($recipeInput: RecipeInput! ){
        createRecipe(recipeInput: $recipeInput) {
            title
            tags
            description
        }
    }
`

export const CREATE_POST = gql`
    mutation CREATE_POST($postInput: PostInput! ) {
        createPost(postInput: $postInput) {
            title
            tags
            description
        }
    }
`

export const CREATE_TIPS = gql`
    mutation CREATE_TIPS($tipsInput: TipsInput!) {
        createTips(tipsInput: $tipsInput) {
            title
        }
    }
`

export const REACT_TO_CONTENT = gql`
    mutation REACT_TO_CONTENT($contentId: String!) {
      reactToContent(contentId: $contentId) {
        message
      }
    }
`

export const UN_REACT_TO_CONTENT = gql`
    mutation REACT_TO_CONTENT($contentId: String!) {
      unReactToContent(contentId: $contentId) {
        message
      }
    }
`

export const ADD_COMMENT = gql`
    mutation ADD_COMMENT($comment: String!, $contentId: ID!) {
        addComment(comment: $comment, contentId: $contentId) {
            message
          }
    }
`

export const SAVE_CONTENT = gql`
    mutation SAVE_CONTENT($contentSaveInput: SaveContentInput!){
        contentSaved(contentSaveInput: $contentSaveInput){
            message
        }
    }
`

export const UNSAVE_CONTENT = gql`
    mutation UNSAVE_CONTENT($contentSaveInput: SaveContentInput!){
        contentUnsaved(contentSaveInput: $contentSaveInput) {
            message
        }
    }
`