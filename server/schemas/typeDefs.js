const schema = `
  # User type with fields for the ID, username, email, book count, and saved books
  type User {
    id: ID!
    name: String!
    emailAddress: String
    numberOfBooks: Int
    books: [Book]
  }

  # Book type with fields for the ID, authors, description, image, link, and title
  type Book {
    id: ID!
    writer: [String]
    summary: String
    picture: String
    url: String
    name: String!
  }

  # Auth type with fields for the token and user
  type Auth {
    jwt: ID!
    userProfile: User
  }

  # Input type for books
  input BookInput {
    writer: [String]
    summary: String!
    id: String!
    picture: String
    url: String
    name: String!
  }

  # Query type with a field for the current user
  type Query {
    currentUser: User
  }

  # Mutation type with fields for login, add user, save book, and remove book
  type Mutation {
    signIn(emailAddress: String!, password: String!): Auth
    registerUser(name: String!, emailAddress: String!, password: String!): Auth
    addBook(bookDetails: BookInput!): User
    deleteBook(id: ID!): User
  }
`;

module.exports = schema;