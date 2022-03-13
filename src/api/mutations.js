import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CREATE_USER($userName: String!, $email: String!, $id: String!) {
        createUser(userName: $userName!, email: $email, id: $id) {
            username
        }
    }
`