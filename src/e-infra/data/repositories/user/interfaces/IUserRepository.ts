import { IUserModel } from '../../../database/models/interfaces/user.interface'
import mongoose, { Document } from 'mongoose'

export default interface IUserRepository {
    getAll(cond: mongoose.MongooseFilterQuery<Pick<Document, "_id">>, opts?: Object): Promise<Document[]>
    getById(_id: string): Promise<Document | null>
    create(data: IUserModel, callback: (error: any, result: IUserModel) => void): void
}

