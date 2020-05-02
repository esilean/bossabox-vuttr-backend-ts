import { IToolModel } from "../../../database/models/interfaces/tool.interface";

export default interface IToolRepository {
    getAll(cond: Object, callback: (error: any, result: IToolModel[]) => void): void
    getById(id: string, callback: (error: any, result: IToolModel) => void): void

    save(data: IToolModel, callback: (error: any, result: IToolModel) => void): void

}