import { IDeleteUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

class DeleteUserService extends Operation implements IDeleteUserService {

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

            this.userRepository.getById(id, (error, user) => {
                if (error) {
                    this.emit(ERROR_MONGOOSE, error)
                }
                else {
                    if (user === null) {
                        this.emit(NOT_FOUND, null)
                    }
                    else {

                        user.remove((error, removedUser) => {
                            if (error) {
                                this.emit(ERROR_MONGOOSE, error)
                            } else {
                                this.emit(SUCCESS, null)
                            }
                        })

                    }
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default DeleteUserService