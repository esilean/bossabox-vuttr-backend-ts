import { Request } from 'express'
import ICradle from '../../../ioc/interfaces/ICradle';
import { AwilixContainer } from 'awilix';

export default interface IRequest extends Request {

    container: {
        cradle: ICradle
    }
}