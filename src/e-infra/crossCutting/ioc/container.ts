import { createContainer, asClass, InjectionMode, asValue, asFunction } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import ICradle from './interfaces/ICradle'
import Server from '../../../a-app/Server'
import App from '../../../a-app/App'
import Router from '../../../a-app/Router'
import Auth from '../authentication'
import Database from '../../data/database'

import config from '../../../../config'
import logger from '../utils/logging/logger'
import errorHandler from '../utils/middlewares/errors/errorHandler'

import CreateUserService from '../../../c-services/user/CreateUserService'
import UserRepository from '../../data/repositories/user/UserRepository'
import UserModel from '../../data/database/models/user'

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

    createUserService: asClass(CreateUserService),
    userRepository: asClass(UserRepository).singleton(),
    userModel: asValue(UserModel)

})

export default container