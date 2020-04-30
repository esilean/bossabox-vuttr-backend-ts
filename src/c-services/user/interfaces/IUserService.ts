import UserEntity from '../../../d-domain/entities/User'
import { IOperation } from '../../interfaces/IOperation';

export interface ICreateUserService extends IOperation {
    execute(body: UserEntity): void
}

