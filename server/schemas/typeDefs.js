const schema = `
  type User {
    id: ID!
    name: String!
    emailAddress: String
    numberOfBooks: Int
    books: [Book]
  }

  type Book {
    id: ID!
    writer: [String]
    summary: String
    picture: String
    url: String
    name: String!
  }

  type Auth {
    jwt: ID!
    userProfile: User
  }

  input BookInput {
    writer: [String]
    summary: String!
    id: String!
    picture: String
    url: String
    name: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    signIn(emailAddress: String!, password: String!): Auth
    registerUser(name: String!, emailAddress: String!, password: String!): Auth
    addBook(bookDetails: BookInput!): User
    deleteBook(id: ID!): User
  }
`;

module.exports = schema;