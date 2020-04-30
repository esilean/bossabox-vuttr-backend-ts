import morgan from 'morgan'
import { Logger } from 'log4js'

export default (logger: Logger) => {
    return morgan('dev', {
        stream: {
            write: (message: string) => {
                logger.info(message.slice(0, -1))
            }
        }
    })
}