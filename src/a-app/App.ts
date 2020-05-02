import IApp from './interfaces/IApp'
import IServer from './interfaces/IServer'
import { Logger } from 'log4js'
import { Mongoose } from 'mongoose'

export default class App implements IApp {

    private server: IServer
    private logger: Logger
    private database: Mongoose

    constructor(server: IServer, logger: Logger, database: Mongoose ) {
        this.server = server
        this.logger = logger
        this.database = database
    }

    start() {
        try {

            var db =  this.database.connection;
            db.on('error', (error) => {
                this.logger.error(`${error}`)
            })
            db.once('open', () => {
                this.logger.info(`DB connection has been established successfully.`)
            });

            this.server.startServer()
        } catch (error) {
            this.logger.error(`StartServerError: ${error}`)
        }
    }
}