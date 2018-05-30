import user from '../../components/user/typedefs'

export default [
  `
  scalar DateTime
  scalar Email
  scalar EntityId

  type Query {
    user(_id: EntityId!): User!
    users(userQuery: UserQuery): [User]!
  }

  type Mutation {
    userAuthenticate(userCredentials: UserCredentials!): UserJWT!
    userCreate(newUser: NewUser!): User!
    userResetPassword(username: String!): Boolean
  }
`,
  ...user,
]
