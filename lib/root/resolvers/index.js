import { GraphQLDateTime as DateTime, GraphQLEmail as Email } from 'graphql-custom-types'
import merge from 'deepmerge'

import user from '../../components/user/resolvers'
import EntityId from './entity-id'

export default merge.all([
  {
    DateTime,
    Email,
    EntityId,
  },
  user,
])
