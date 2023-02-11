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

export const POST_NOTIFICATION_GET = gql`
    query OnGetPostNotification {
        getNotification {
            id
            message
            status
        }
    }
`;