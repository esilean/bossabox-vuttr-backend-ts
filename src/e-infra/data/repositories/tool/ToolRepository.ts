import IToolRepository from "./interfaces/IToolRepository";
import { Model, Document } from "mongoose";
import { IToolModel } from "../../database/models/interfaces/tool.interface";

export default class ToolRepository implements IToolRepository {

    private toolModel: Model<Document>

    constructor(toolModel: Model<Document>) {
        this.toolModel = toolModel
    }

    getAll(cond: Object, callback: (error: any, result: IToolModel[]) => void) {
        this.toolModel.find(cond, callback)
    }

    getById(id: string, callback: (error: any, result: IToolModel) => void) {
        this.toolModel.findById(id, callback)
    }

    save(data: IToolModel, callback: (error: any, result: IToolModel) => void) {
        data.save({}, callback)
    }



}