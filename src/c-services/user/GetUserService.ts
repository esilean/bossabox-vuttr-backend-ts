import { IGetUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import { toEntity } from './UserMapper'

class GetUserService extends Operation implements IGetUserService {

    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'NOT_FOUND'])

        this.userRepository = userRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(id: string) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND } = this.getEventType()

        try {

            this.userRepository.getById(id, (error, result) => {
                if (error) {
                    this.emit(ERROR_MONGOOSE, error)
                }
                else {
                    if (result === null) {
                        this.emit(NOT_FOUND, null)
                    }
                    else {
                        const { id, name, email, password, created_at, updated_at } = toEntity(result)

                        this.emit(SUCCESS, { id, name, email, password, created_at, updated_at })
                    }
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default GetUserService