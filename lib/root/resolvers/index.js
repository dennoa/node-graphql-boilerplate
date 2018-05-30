import { GraphQLDateTime as DateTime, GraphQLEmail as Email } from 'graphql-custom-types'
import merge from 'deepmerge'

import EntityId from './entity-id'
import { PagingSkip, PagingLimit } from './paging'

// Include other resolvers here
import user from '../../components/user/resolvers'

export default merge.all([
  {
    DateTime,
    Email,
    EntityId,
    PagingSkip,
    PagingLimit,
  },
  user,
])
