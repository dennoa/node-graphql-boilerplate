export default [
  `
  type User {
    _id: EntityId!
    username: String!
    email: Email!
    firstName: String
    lastName: String
    created: DateTime!
  }

  type UserJWT {
    jwt: String!
  }

  input UserCredentials {
    username: String!
    password: String!
  }

  input UserQuery {
    username: String
    email: String
    firstName: String
    lastName: String
    skip: Int
    limit: Int
  }

  input NewUser {
    username: String
    email: Email!
    firstName: String
    lastName: String
    password: String
  }
`,
]
