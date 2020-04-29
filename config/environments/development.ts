import path from 'path'

const logPath = path.join(__dirname, '../../logs/development.log')

export = {
    port: process.env.PORT || 3000,
    logging:
    {
        appenders: {
            toFile: {
                type: 'file',
                filename: logPath
            },
            toConsole: {
                type: 'console',
                filename: logPath
            }            
        },
        categories: {
            default: { appenders: ['toFile', 'toConsole'], level: 'DEBUG' }
        }
    },
    authSecret: process.env.SECRET,
    authSession: {
        session: false
    }
}