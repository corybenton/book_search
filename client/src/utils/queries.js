import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            savedBooks {
                _id
                title
                authors
                description
                image
                bookId
            }
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                _id
                title
                authors
                description
                image
                bookId
            }
        }
    }
`;