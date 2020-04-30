import Status from 'http-status'
import { IRequest, IResponse, INext } from '../../interfaces/express'

export default (error: Error, request: IRequest, response: IResponse, next: INext) => {

    const { logger, config } = request.container.cradle

    logger.error(error)

    const resp = Object.assign({
        type: 'InternalServerError'
    }, config.env === 'development' && {
        message: error.message,
        stack: error.stack
    })

    response.status(Status.INTERNAL_SERVER_ERROR).json(resp)

}