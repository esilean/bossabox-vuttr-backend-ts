import { Router } from "express"
import { Logger } from "log4js"
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'

import IConfig from "../../config/interfaces/IConfig"
import morgan from '../infra/crossCutting/utils/middlewares/logger/index'
import swagger from '../infra/crossCutting/utils/swagger'

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

    apiRouter.get('/', (req, res) => {
        res.status(200).json({ message: 'Hello!' })
    })

    router.use('/api', apiRouter)
    router.use(errorHandler)
    return router
}