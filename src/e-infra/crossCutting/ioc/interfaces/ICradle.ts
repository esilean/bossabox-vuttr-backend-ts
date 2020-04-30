import IApp from '../../../../a-app/interfaces/IApp'
import IServer from '../../../../a-app/interfaces/IServer'
import IConfig from '../../../../../config/interfaces/IConfig'
import Log4js from 'log4js'
import { Router, Response, NextFunction, Handler } from 'express'
import passport, { AuthenticateOptions } from 'passport'
import IAuth from '../../authentication/interfaces/IAuth'
import Database from '../../../data/database'
import { ICreateUserService } from '../../../../c-services/user/interfaces/IUserService'
import IUserRepository from '../../../data/repositories/user/interfaces/IUserRepository'
import { IUserModel } from '../../../data/database/models/interfaces/user.interface'

import mongoose from 'mongoose'

interface ICradle extends Request {
    app: IApp
    server: IServer
    database: Database
    router: Router
    container: (req: any, res: Response<any>, next: NextFunction) => void
    config: IConfig
    logger: Log4js.Logger
    errorHandler: void
    auth: IAuth

    createUserService: ICreateUserService
    userRepository: IUserRepository
    userModel: mongoose.Model<IUserModel>
}

export default ICradle