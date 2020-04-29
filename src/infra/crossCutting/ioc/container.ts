import { createContainer, asClass, InjectionMode, asValue, asFunction } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import ICradle from './interfaces/ICradle'
import Server from '../../../app/Server'
import App from '../../../app/App'
import Router from '../../../app/Router'
import Auth from '../authentication/'
import Database from '../../data/database'

import config from '../../../../config'
import logger from '../utils/logging/logger'
import errorHandler from '../utils/middlewares/errors/errorHandler'


const container = createContainer<ICradle>(
    { injectionMode: InjectionMode.CLASSIC }
)

container.register({
    app: asClass(App).singleton(),
    server: asClass(Server).singleton(),
    auth: asClass(Auth).singleton(),
    database: asClass(Database).singleton(),
    router: asFunction(Router).singleton(),
    container: asValue(scopePerRequest(container)),
    config: asValue(config),
    logger: asFunction(logger),
    errorHandler: asValue(errorHandler),

    // jwt: asFunction(jwt).singleton(),
    
})

export default container