import { Handler } from 'express'

interface IAuth {
    initialize(): Handler,
    authenticate(): any,
}

export default IAuth