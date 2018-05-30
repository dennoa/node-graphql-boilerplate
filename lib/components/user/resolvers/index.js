import { getPaging } from '../../../utils/query'
import model from '../model'
import { isMatchingPassword, toJwt, getRandomPassword, hashPassword } from '../auth-helper'
import { notifyPasswordReset } from '../events'

const queryFields = ['username', 'email', 'firstName', 'lastName']

function toFindConditions(query = {}) {
  function toFindCondition(conditions, key) {
    if (typeof query[key] === 'undefined') {
      return conditions
    }
    return { [key]: new RegExp(query[key], 'i'), ...conditions }
  }
  return queryFields.reduce(toFindCondition, {})
}

async function find(_, { userQuery }) {
  const { skip, limit } = getPaging(userQuery)
  return model
    .find(toFindConditions(userQuery))
    .skip(skip)
    .limit(limit)
}

async function userCreate(_, { newUser }) {
  const password = newUser.password || getRandomPassword()
  const user = {
    passwordHash: await hashPassword(password),
    ...newUser,
  }
  user.username = user.username || user.email
  return model.create(user)
}

async function get(_, _id) {
  return model.findOne({ _id })
}

async function userAuthenticate(_, { userCredentials }) {
  const { username, password } = userCredentials
  const user = await model.findOne({ username })
  if (await isMatchingPassword(user, password)) {
    return { jwt: toJwt(user) }
  }
  throw new Error('Invalid credentials')
}

async function userResetPassword(_, { username }) {
  const user = await model.findOne({ username })
  if (!user) {
    return false
  }
  const password = getRandomPassword()
  user.passwordHash = await hashPassword(password)
  await user.save()
  const { email, firstName, lastName } = user
  notifyPasswordReset({ password, username, email, firstName, lastName })
  return true
}

export default {
  Query: {
    user: get,
    users: find,
  },
  Mutation: {
    userAuthenticate,
    userCreate,
    userResetPassword,
  },
}
