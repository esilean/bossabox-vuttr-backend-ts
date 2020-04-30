import mongoose from 'mongoose'
import IConfig from '../../../../config/interfaces/IConfig'
import { Logger } from 'log4js'

class Database {
    constructor(config: IConfig, logger: Logger) {

        if(!config.db.url){
            logger.error(`Database config not found.`)
            return false
        }

        mongoose.connect(`${config.db.url}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return mongoose
    }
}

export default Database
