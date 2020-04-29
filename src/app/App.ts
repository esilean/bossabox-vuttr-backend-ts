import IApp from './interfaces/IApp'
import IServer from './interfaces/IServer'
import { Logger } from 'log4js'
import { Mongoose } from 'mongoose'

export default class App implements IApp {

    private _server: IServer
    private _logger: Logger
    private _database: Mongoose

    constructor(server: IServer, logger: Logger, database: Mongoose ) {
        this._server = server
        this._logger = logger
        this._database = database
    }

    start() {
        try {

            var db =  this._database.connection;
            db.on('error', (error) => {
                this._logger.error(`${error}`)
            })
            db.once('open', () => {
                this._logger.info(`DB connection has been established successfully.`)
            });

            this._server.startServer()
        } catch (error) {
            this._logger.error(`StartServerError: ${error}`)
        }
    }
}