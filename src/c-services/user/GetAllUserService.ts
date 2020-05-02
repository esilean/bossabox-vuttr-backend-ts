import { IGetAllUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import { toEntity } from './UserMapper'

class GetAllUserService extends Operation implements IGetAllUserService {

    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE'])

        this.userRepository = userRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute() {

        const { SUCCESS, ERROR, ERROR_MONGOOSE } = this.getEventType()

        try {

            this.userRepository.getAll({}, (error, result) => {
                if (error) {
                    this.emit(ERROR_MONGOOSE, error)
                }
                else {

                    const users = result.map(res => {
                        const { id, name, email, password, created_at, updated_at } = toEntity(res)
                        return { id, name, email, password, created_at, updated_at }
                    })

                    this.emit(SUCCESS, users)
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default GetAllUserService