import UserEntity from '../../../d-domain/entities/User'
import { IOperation } from '../../interfaces/IOperation';

export interface IGetAllUserService extends IOperation {
    execute(): void
}

export interface IGetUserService extends IOperation {
    execute(id: string): void
}

export interface ICreateUserService extends IOperation {
    execute(body: UserEntity): void
}

export interface IUpdateUserService extends IOperation {
    execute(id: string, body: UserEntity): void
}

export interface IDeleteUserService extends IOperation {
    execute(id: string): void
}


