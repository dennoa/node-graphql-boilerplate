import user from '../../components/user/typedefs'

// Add new queries and mutations here
export default [
  `
  scalar DateTime
  scalar Email
  scalar EntityId
  scalar PagingSkip
  scalar PagingLimit

  type Query {
    user(_id: EntityId!): User!
    users(userQuery: UserQuery): [User]!
    userAuthenticate(userCredentials: UserCredentials!): UserJWT!
  }

  type Mutation {
    userCreate(newUser: NewUser!): User!
    userResetPassword(username: String!): Boolean
  }
`,
  ...user,
]
