import mongoose, { Schema, Document } from 'mongoose'
import { IUserModel } from './interfaces/user.interface'

import { encryptPassword } from '../../../crossCutting/authentication/encryption'

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 1
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', function (this: IUserModel, next) {
    this.created_at = new Date()
    this.password = encryptPassword(this.password)
    next()
})

export default mongoose.model<IUserModel>('user', UserSchema, 'users', true)