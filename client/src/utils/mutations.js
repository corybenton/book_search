import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const saveBook = gql`
    mutation saveBook($book: ID!) {
        saveBook(id: $book) {
            token
            user{
                _id
                username
                savedBooks{
                    _id
                    title
                    author
                }
            }
        }
    }
`;

export const deleteBook = gql`
    mutation deleteBook($book: ID!) {
        deleteBook(id: $book) {
            token
            user{
                _id
                username
                savedBooks{
                    _id
                    title
                    author
                }
            }
        }
    }
`;