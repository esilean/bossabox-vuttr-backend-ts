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
    if (this.isNew)
        this.password = encryptPassword(this.password)

    this.updated_at = new Date()
    next()
})

export default mongoose.model<IUserModel>('user', UserSchema)