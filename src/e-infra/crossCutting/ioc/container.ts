import { createContainer, asClass, InjectionMode, asValue, asFunction, Lifetime } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import ICradle from './interfaces/ICradle'
import Server from '../../../a-app/Server'
import App from '../../../a-app/App'
import Router from '../../../a-app/Router'
import Auth from '../authentication'
import Database from '../../data/database'

import jwt from '../authentication/jwt'
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
    jwt: asClass(jwt).singleton(),
    database: asClass(Database).singleton(),
    router: asFunction(Router).singleton(),
    container: asValue(scopePerRequest(container)),
    config: asValue(config),
    logger: asFunction(logger),
    errorHandler: asValue(errorHandler),
})

container.loadModules([
    ['../../data/database/models/*.ts', { register: asValue }]
], {
    cwd: __dirname,
    formatName: 'camelCase'
})

container.loadModules([
    ['../../data/repositories/**/*.ts', { register: asClass, lifetime: Lifetime.SINGLETON }]
], {
    cwd: __dirname,
    formatName: 'camelCase'
})

container.loadModules([
    ['../../../c-services/**/*.ts', { register: asClass }]
], {
    cwd: __dirname,
    formatName: 'camelCase'
})

export default container