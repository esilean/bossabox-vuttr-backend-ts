import { Router, Request, Response, NextFunction } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import { ICreateUserService } from '../../c-services/user/interfaces/IUserService'
import UserEntity from '../../d-domain/entities/User'
import { ICustomRequest } from '../../a-app/interfaces/ICustomRequest'
import { IUserModel } from '../../e-infra/data/database/models/interfaces/user.interface'

export default () => {

    const router = Router()

    const api = makeInvoker(userController)

    router.post('/', api('create'))
    return router
}

function userController(createUserService: ICreateUserService) {
    return {
        create: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {

            const { SUCCESS, ERROR, VALIDATION_ERROR } = createUserService.getEventType()

            createUserService
                .on(SUCCESS, (user: IUserModel) => {
                    response.status(Status.OK).json(user)
                })
                .on(VALIDATION_ERROR, (error: any) => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'ValidationError',
                        message: error
                    })
                })
                .on(ERROR, next)


            createUserService.execute(request.body)
        },
    }
}