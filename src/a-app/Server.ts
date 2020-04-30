import express, { Router } from 'express'
import IServer from './interfaces/IServer'
import IConfig from '../../config/interfaces/IConfig'
import { Logger } from 'log4js'
import { AddressInfo } from 'net'
import IAuth from '../e-infra/crossCutting/authentication/interfaces/IAuth'

export default class Server implements IServer {

    private _app: express.Application
    private _config: IConfig
    private _logger: Logger

    constructor(router: Router, config: IConfig, logger: Logger, auth: IAuth) {
        this._config = config
        this._logger = logger


        this._app = express()
        this._app.disable('x-powered-by')

        this._app.use(auth.initialize())
        this._app.use(router)
        this._app.use(express.static('files'))
    }

    getApp() {
        return this._app
    }

    startServer() {
        const http = this._app.listen(this._config.port, () => {
            const { port } = http.address() as AddressInfo
            this._logger.info(`API running on port: ${port}`)
        })
    }
}