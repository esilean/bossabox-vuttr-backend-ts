import express, { Router } from 'express'
import IServer from './interfaces/IServer'
import IConfig from '../../config/interfaces/IConfig'
import { Logger } from 'log4js'
import { AddressInfo } from 'net'
import IAuth from '../e-infra/crossCutting/authentication/interfaces/IAuth'

export default class Server implements IServer {

    private app: express.Application
    private config: IConfig
    private logger: Logger

    constructor(router: Router, config: IConfig, logger: Logger, auth: IAuth) {
        this.config = config
        this.logger = logger


        this.app = express()
        this.app.disable('x-powered-by')

        this.app.use(auth.initialize())
        this.app.use(router)
        this.app.use(express.static('files'))
    }

    getApp() {
        return this.app
    }

    startServer() {
        const http = this.app.listen(this.config.port, () => {
            const { port } = http.address() as AddressInfo
            this.logger.info(`API running on port: ${port}`)
        })
    }
}