require('dotenv').config()
import path from 'path'
import databaseConfig from './database'

const ENV: string = process.env.NODE_ENV || 'development'

const envConfig = require(path.join(__dirname, 'environments', ENV))
let dbConfig = null

switch (ENV) {
    case "development":
        dbConfig = databaseConfig.development
        break
    case "test":
        dbConfig = databaseConfig.test
        break
    case "production":
        dbConfig = databaseConfig.production
        break
    default:
}

const config = Object.assign({
    env: ENV,
    db: dbConfig,
}, envConfig)

export default config