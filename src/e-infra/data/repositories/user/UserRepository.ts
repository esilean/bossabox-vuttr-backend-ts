import { Model, Document } from 'mongoose'
import { IUserModel } from '../../database/models/interfaces/user.interface'
import IUserRepository from './interfaces/IUserRepository'

export default class UserRepository implements IUserRepository {

    private userModel: Model<Document>

    constructor(userModel: Model<Document>) {
        this.userModel = userModel
    }

    getAll(cond: Object, callback: (error: any, result: IUserModel[]) => void) {
        this.userModel.find(cond, callback)
    }

    getById(id: string, callback: (error: any, result: IUserModel) => void) {
        this.userModel.findById(id, callback)
    }

    save(data: IUserModel, callback: (error: any, result: IUserModel) => void) {
        data.save({}, callback)
    }

    //@Deprecated
    update(id: string, data: IUserModel, callback: (error: any, result: Document | null) => void) {
        console.warn("Calling deprecated function. UserRepository (update)")

        const { name, email, updated_at } = data
        this.userModel.findByIdAndUpdate(id, { name, email, updated_at }, { new: true }, callback)
    }

    delete(id: string, callback: (error: any, result: Document | null) => void) {
        console.warn("Calling deprecated function. UserRepository (delete)")

        this.userModel.findByIdAndDelete(id, callback)
    }

}