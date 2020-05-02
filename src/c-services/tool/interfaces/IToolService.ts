import ToolEntity from '../../../d-domain/entities/Tool'
import { IOperation } from "../../interfaces/IOperation";

export interface IGetAllToolService extends IOperation {
    execute(tag?: string): void
}

export interface IGetToolService extends IOperation {
    execute(id: string): void
}

export interface ICreateToolService extends IOperation {
    execute(body: ToolEntity): void
}

export interface IDeleteToolService extends IOperation {
    execute(id: string): void
}