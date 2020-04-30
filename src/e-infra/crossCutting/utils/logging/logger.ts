import { configure, getLogger } from 'log4js'
import IConfig from '../../../../../config/interfaces/IConfig'

export default (config: IConfig) => {

    const file = Object.create(config.logging)
    configure(file)

    const logger = getLogger()
    logger.level = 'debug'

    return logger
}