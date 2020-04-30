import { IUserModel } from '../../../database/models/interfaces/user.interface'
import { Document } from 'mongoose'

export default interface IUserRepository {

    getAll(callback: (error: any, result: IUserModel[]) => void): void
    getById(id: string, callback: (error: any, result: IUserModel) => void): void

    create(data: IUserModel, callback: (error: any, result: IUserModel) => void): void
    update(id: string, data: IUserModel, callback: (error: any, result: Document | null) => void): void
    delete(id: string, callback: (error: any, result: Document | null) => void): void
}

