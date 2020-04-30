import Status from 'http-status'
import { Request, Response, NextFunction } from 'express'
import container from '../../ioc/container'
import { Logger } from "log4js"
import IConfig from "../../../../../config/interfaces/IConfig"

export default (error: Error, request: Request, response: Response, next: NextFunction) => {

    const logger = container.resolve<Logger>('logger')
    const config = container.resolve<IConfig>('config')

    logger.error(error)

    const resp = Object.assign({
        type: 'InternalServerError'
    }, config.env === 'development' && {
        message: error.message,
        stack: error.stack
    })

    response.status(Status.INTERNAL_SERVER_ERROR).json(resp)

}