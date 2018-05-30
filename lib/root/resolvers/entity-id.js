import { GraphQLScalarType } from 'graphql'

const pattern = new RegExp('^[0-9A-Fa-f]{24}$')

function parseValue(value) {
  if (pattern.test(value)) {
    return value
  }
  throw new TypeError(`EntityId must be of the form /${pattern.source}/`)
}

export default new GraphQLScalarType({
  name: 'EntityId',
  description: 'Entity Identitier',
  serialize: _id => {
    if (_id.toString) {
      return _id.toString()
    }
    return _id
  },
  parseValue,
  parseLiteral: ast => parseValue(ast.value),
})
