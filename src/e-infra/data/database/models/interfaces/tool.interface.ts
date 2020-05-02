import { Document } from 'mongoose'

export interface IToolModel extends Document {
    title: string
    link: string
    description: string
    tags: Array<string>
    created_at: Date
    updated_at: Date
}