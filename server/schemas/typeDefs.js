const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Books]
    }

    type Book {
        _id: ID
        authors: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        deleteBook(book: ID!): Book
        saveBook(book: ID!): Book
    }
`;

module.exports = typeDefs;