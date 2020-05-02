import TokenEntity from '../../../d-domain/entities/Token'
import { IOperation } from '../../interfaces/IOperation';

export interface IGetTokenService extends IOperation {
    execute(body: TokenEntity): void
}


