import {gql} from "@apollo/client";

export const POST_CREATE_SUBSCRIPTION = gql`
    subscription OnContentCreateSubscription {
        contentCreateSubscription {
            id
            contentId
            message
            status
        }
    }
`;