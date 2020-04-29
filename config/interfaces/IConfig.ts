
interface IConfig {
    env: string,
    db: {
        url: string
    },
    port: number,
    logging: ILogging,
    authSecret: string,
    authSession: IAuthSession
}

interface ILogging {
    appenders: Object,
    categories: Object,
}

interface IAuthSession {
    session: boolean
}

export default IConfig