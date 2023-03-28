import { gql } from "@apollo/client";

export const CHECK_USER_SAVED_CONTENT = gql`
    query checkUserSavedContent($contentId: String!) {
        checkUserSavedContent(contentId: $contentId) {
            message
        }
    }
`
