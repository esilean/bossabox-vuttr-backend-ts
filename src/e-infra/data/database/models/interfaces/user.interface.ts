import { Document } from 'mongoose'

export interface IUserModel extends Document {
    name: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
}