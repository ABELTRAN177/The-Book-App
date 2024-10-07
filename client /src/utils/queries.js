import { gql } from '@apollo/client';

// Define the QUERY_ME GraphQL query
export const QUERY_ME = gql`
    {
        me {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
    `;

