import mongoose, { Document } from 'mongoose'
import { IUserModel } from '../../database/models/interfaces/user.interface'
import IUserRepository from './interfaces/IUserRepository'

export default class UserRepository implements IUserRepository {

    private _userModel: mongoose.Model<Document>

    constructor(userModel: mongoose.Model<Document>) {
        this._userModel = userModel
    }

    async getAll(cond: mongoose.MongooseFilterQuery<Pick<mongoose.Document, "_id">>, opts?: Object) {
        return await this._userModel.find(cond, null, opts)
    }

    async getById(_id: string) {
        return await this._userModel.findById(_id)
    }

    create(data: IUserModel, callback: (error: any, result: IUserModel) => void) {
        this._userModel.create(data, callback)
    }

}