import { Router } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import { celebrate, Segments, Joi } from 'celebrate'

import { ICustomRequest } from '../../a-app/interfaces/ICustomRequest'
import { IResponse, INext } from '../../e-infra/crossCutting/utils/interfaces/express'

import { IGetTokenService } from '../../c-services/token/interfaces/ITokenService'
import TokenEntity from '../../d-domain/entities/Token'
import IToken from '../../e-infra/crossCutting/authentication/interfaces/IToken'

export default () => {

    const router = Router()

    const api = makeInvoker(tokenController)

    router.post('/',
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().max(100),
                password: Joi.string().required().max(100),
            })
        }), api('getToken'))

    return router

}

function tokenController(getTokenService: IGetTokenService) {
    return {
        getToken: (request: ICustomRequest<TokenEntity>, response: IResponse, next: INext) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND, VALIDATION_ERROR } = getTokenService.getEventType()

            getTokenService
                .on(SUCCESS, (token: IToken) => {
                    response.status(Status.OK).json(token)
                })
                .on(VALIDATION_ERROR, (error: any) => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'ValidationError',
                        message: error.message,
                    })
                })
                .on(NOT_FOUND, (error: any) => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        message: error.message,
                    })
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            getTokenService.execute(request.body)
        }
    }

}