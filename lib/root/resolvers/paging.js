import { GraphQLScalarType } from 'graphql'

const mustBePositive = 'Must be >= 0'

function toPositiveInteger(value) {
  try {
    const num = parseInt(`${value}`, 10)
    if (num < 0) {
      throw new TypeError(mustBePositive)
    }
    return num
  } catch (e) {
    throw new TypeError(mustBePositive)
  }
}

function toMaxValue(value, max) {
  const num = toPositiveInteger(value)
  if (num > max) {
    throw new TypeError(`Must be <= ${max}`)
  }
  return num
}

export const PagingSkip = new GraphQLScalarType({
  name: 'PagingSkip',
  description: 'Skips a number of results',
  serialize: num => num,
  parseValue: value => toMaxValue(value, 500),
  parseLiteral: ast => toMaxValue(ast.value, 500),
})

export const PagingLimit = new GraphQLScalarType({
  name: 'PagingLimit',
  description: 'Limits the number of results',
  serialize: num => num,
  parseValue: value => toMaxValue(value, 100),
  parseLiteral: ast => toMaxValue(ast.value, 100),
})
