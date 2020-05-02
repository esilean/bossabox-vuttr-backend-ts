import { Router, Request, Response, NextFunction } from 'express'
import { makeInvoker } from 'awilix-express'
import Status from 'http-status'

import { celebrate, Segments, Joi } from 'celebrate'

import { ICreateToolService, IDeleteToolService, IGetToolService, IGetAllToolService } from '../../c-services/tool/interfaces/IToolService'
import ToolEntity from '../../d-domain/entities/Tool'
import { ICustomRequest } from '../../a-app/interfaces/ICustomRequest'
import { IToolModel } from '../../e-infra/data/database/models/interfaces/tool.interface'
import IAuth from '../../e-infra/crossCutting/authentication/interfaces/IAuth'

export default () => {

    const router = Router()

    const api = makeInvoker(toolController)

    router.get('/', api('authenticate'),
        celebrate({
            [Segments.QUERY]: Joi.object().keys({
                tag: Joi.string()
            })
        }),
        api('getAll'))

    router.get('/:id', api('authenticate'),
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.string().required().min(24).max(24),
            }),
        }),
        api('get'))

    router.post('/', api('authenticate'),
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required().max(100),
                link: Joi.string().required().max(255),
                description: Joi.string().required().max(1000),
                tags: Joi.array().required(),
            })
        }),
        api('create'))

    router.delete('/:id', api('authenticate'),
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.string().required().min(24).max(24),
            }),
        }),
        api('delete'))

    return router
}

function toolController(
    auth: IAuth,
    getAllToolService: IGetAllToolService,
    getToolService: IGetToolService,
    createToolService: ICreateToolService,
    deleteToolService: IDeleteToolService
) {
    return {
        authenticate: auth.authenticate(),
        getAll: (request: ICustomRequest<ToolEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE } = getAllToolService.getEventType()

            getAllToolService
                .on(SUCCESS, (tools: IToolModel[]) => {
                    response.status(Status.OK).json(tools)
                })
                .on(ERROR_MONGOOSE, (error: any) => {
                    response.status(Status.INTERNAL_SERVER_ERROR).json({
                        type: 'DatabaseError',
                        message: error.message
                    })
                })
                .on(ERROR, next)

            const { tag } = request.query

            getAllToolService.execute(tag)
        },
        get: (request: ICustomRequest<ToolEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = getToolService.getEventType()

            getToolService
                .on(SUCCESS, (tool: IToolModel) => {
                    response.status(Status.OK).json(tool)
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        error: 'Tool not found'
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
            getToolService.execute(id)
        },
        create: (request: ICustomRequest<ToolEntity>, response: Response, next: NextFunction) => {

            const { SUCCESS, ERROR, ERROR_MONGOOSE, VALIDATION_ERROR } = createToolService.getEventType()

            createToolService
                .on(SUCCESS, (tool: IToolModel) => {
                    response.status(Status.CREATED).json(tool)
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


            createToolService.execute(request.body)
        },
        delete: (request: ICustomRequest<ToolEntity>, response: Response, next: NextFunction) => {
            const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = deleteToolService.getEventType()

            deleteToolService
                .on(SUCCESS, () => {
                    response.status(Status.NO_CONTENT).json()
                })
                .on(NOT_FOUND, () => {
                    response.status(Status.BAD_REQUEST).json({
                        type: 'NotFoundError',
                        error: 'Tool not found'
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
            deleteToolService.execute(id)
        },
    }
}