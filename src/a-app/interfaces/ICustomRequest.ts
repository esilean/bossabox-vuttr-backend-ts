import { Request } from 'express'


export interface ICustomRequest<T> extends Request {
    body: T,
    query: {
        tag: string
    }
}