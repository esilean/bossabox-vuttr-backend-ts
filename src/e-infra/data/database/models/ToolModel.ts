import mongoose, { Schema, Document } from 'mongoose'
import { IToolModel } from './interfaces/tool.interface'

const ToolSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
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

ToolSchema.pre('save', function (this: IToolModel, next) {
    this.updated_at = new Date()
    next()
})

export default mongoose.model<IToolModel>('tool', ToolSchema, 'tools', true)