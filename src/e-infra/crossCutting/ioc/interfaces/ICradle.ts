import IApp from '../../../../a-app/interfaces/IApp'
import IServer from '../../../../a-app/interfaces/IServer'
import IConfig from '../../../../../config/interfaces/IConfig'
import Log4js from 'log4js'
import { Router, Response, NextFunction } from 'express'
import IAuth from '../../authentication/interfaces/IAuth'
import Database from '../../../data/database'
import IJwt from '../../authentication/interfaces/IJwt'


interface ICradle extends Request {
    app: IApp
    server: IServer
    database: Database
    router: Router
    container: (req: any, res: Response<any>, next: NextFunction) => void
    config: IConfig
    logger: Log4js.Logger
    errorHandler: void
    auth: IAuth,
    jwt: IJwt

}

export default ICradle