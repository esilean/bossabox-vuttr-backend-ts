import mongoose, { Document } from 'mongoose'
import { IUserModel } from '../../database/models/interfaces/user.interface'
import IUserRepository from './interfaces/IUserRepository'

export default class UserRepository implements IUserRepository {

    private _userModel: mongoose.Model<Document>

    constructor(userModel: mongoose.Model<Document>) {
        this._userModel = userModel
    }

    getAll(callback: (error: any, result: IUserModel[]) => void) {
        this._userModel.find({}, callback)
    }

    getById(id: string, callback: (error: any, result: IUserModel) => void) {
        this._userModel.findById(id, callback)
    }

    create(data: IUserModel, callback: (error: any, result: IUserModel) => void) {
        this._userModel.create(data, callback)
    }

    update(id: string, data: IUserModel, callback: (error: any, result: Document | null) => void) {

        const { name, email, updated_at } = data

        this._userModel.findByIdAndUpdate(id, { name, email, updated_at }, { new: true }, callback)
    }

    delete(id: string, callback: (error: any, result: Document | null) => void) {
        this._userModel.findByIdAndDelete(id, callback)
    }

}