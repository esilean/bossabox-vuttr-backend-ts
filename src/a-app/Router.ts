import { Router } from "express"
import { Logger } from "log4js"
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import IConfig from "../../config/interfaces/IConfig"
import morgan from '../e-infra/crossCutting/utils/middlewares/logger/index'
import swagger from '../e-infra/crossCutting/utils/swagger'

//import controllers
import index from '../b-controllers'
import userController from '../b-controllers/user/userController'
import tokenController from '../b-controllers/token/tokenController'
import toolController from '../b-controllers/tool/toolController'

export default (config: IConfig, logger: Logger, container: any, errorHandler: any) => {

    const router = Router()

    if (config.env !== 'test') {
        router.use(morgan(logger))
    }

    const apiRouter = Router()

    apiRouter.use(cors())
    apiRouter.use(bodyParser.json())
    apiRouter.use(compression())
    apiRouter.use(container)
    apiRouter.use('/docs', swagger)

    apiRouter.use('/', index())
    apiRouter.use('/token', tokenController())
    apiRouter.use('/users', userController())
    apiRouter.use('/tools', toolController())


    router.use('/api', apiRouter)
    router.use(errorHandler)
    return router
}