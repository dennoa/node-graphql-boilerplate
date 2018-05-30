import { Router } from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import info from '../package.json'
import config from './config'
import root from './root'
import { identifyUser } from './utils/middleware'

const schema = makeExecutableSchema(root)

const routes = Router()

routes.use('/graphql', identifyUser, graphqlExpress({ schema }))
routes.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Basic landing page
routes.use('/', (req, res) => res.render('index', { info, config }))

export default routes
