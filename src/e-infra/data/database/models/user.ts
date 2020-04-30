import mongoose, { Schema, Document } from 'mongoose'
import { IUserModel } from './interfaces/user.interface'


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

export default mongoose.model<IUserModel>('user', UserSchema, 'users', true)