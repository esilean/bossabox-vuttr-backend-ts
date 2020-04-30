import { Router, Request, Response, NextFunction } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import { ICreateUserService, IDeleteUserService, IGetUserService, IGetAllUserService, IUpdateUserService } from '../../c-services/user/interfaces/IUserService'
import UserEntity from '../../d-domain/entities/User'
import { ICustomRequest } from '../../a-app/interfaces/ICustomRequest'
import { IUserModel } from '../../e-infra/data/database/models/interfaces/user.interface'

export default () => {

    const router = Router()

    const api = makeInvoker(userController)

    router.get('/', api('getAll'))
    router.get('/:id', api('get'))
    router.post('/', api('create'))
    router.put('/:id', api('update'))
    router.delete('/:id', api('delete'))
    return router
}

function userController(
    getAllUserService: IGetAllUserService,
    getUserService: IGetUserService,
    createUserService: ICreateUserService,
    updateUserService: IUpdateUserService,
    deleteUserService: IDeleteUserService
) {
    return {
        getAll: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE } = getAllUserService.getEventType()

            getAllUserService
                .on(SUCCESS, (users: IUserModel[]) => {
                    response.status(Status.OK).json(users)
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            getAllUserService.execute()
        },
        get: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = getUserService.getEventType()

            getUserService
                .on(SUCCESS, (user: IUserModel) => {
                    response.status(Status.OK).json(user)
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        error: 'User not found'
                    })
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            const { id } = request.params
            getUserService.execute(id)
        },
        create: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {

            const { SUCCESS, ERROR, ERROR_MONGOOSE, VALIDATION_ERROR } = createUserService.getEventType()

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
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)


            createUserService.execute(request.body)
        },
        update: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {

            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND, VALIDATION_ERROR } = updateUserService.getEventType()

            updateUserService
                .on(SUCCESS, (user: IUserModel) => {
                    response.status(Status.OK).json(user)
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        error: 'User not found'
                    })
                })                
                .on(VALIDATION_ERROR, (error: any) => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'ValidationError',
                        message: error
                    })
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            const { id } = request.params
            updateUserService.execute(id, request.body)
        },
        delete: (request: ICustomRequest<UserEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = deleteUserService.getEventType()

            deleteUserService
                .on(SUCCESS, () => {
                    response.status(Status.NO_CONTENT).json()
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        error: 'User not found'
                    })
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            const { id } = request.params
            deleteUserService.execute(id)
        },
    }
}