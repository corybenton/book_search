const typeDefs = `
    type Book {
        _id: ID
        authors: [String]
        bookId: String
        image: String
        description: String
        title: String
    }

    input BookInput {
        authors: [String]
        bookId: String
        image: String
        description: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteBook(book: BookInput!): Book
        saveBook(book: BookInput!): User
    }
`;

module.exports = typeDefs;