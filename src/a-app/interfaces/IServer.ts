interface IServer {
    getApp(): Express.Application
    startServer(): void
}

export default IServer