
import Status from 'http-status'
import { Router, Request, Response } from 'express'

export default function index() {

    const router: Router = Router()

    router.get('/',
        (request: Request, response: Response) => {
            response.status(Status.OK).json({
                status: 'WOA! Typescript API is Working!',
            })
        })

    return router
}