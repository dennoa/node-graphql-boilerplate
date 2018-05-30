import { Router } from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import info from '../package.json'
import config from './config'
import root from './root'
import { identifyUser } from './utils/middleware'

const schema = makeExecutableSchema(root)

const routes = Router()

const context = {}
const gql = graphqlExpress({ schema, context })

routes.use('/graphql', identifyUser, (req, res, next) => {
  context.req = req
  context.res = res
  return gql(req, res, next)
})

routes.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Basic landing page
routes.use('/', (req, res) => res.render('index', { info, config }))

export default routes
