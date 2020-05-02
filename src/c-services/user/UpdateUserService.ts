import { IUpdateUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import { toUpdate, toEntity } from './UserMapper'
import UserEntity from "../../d-domain/entities/User"

import { validate } from 'class-validator'
import { getErrors } from '../ErrorValidation'

class UpdateUserService extends Operation implements IUpdateUserService {

    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'NOT_FOUND', 'VALIDATION_ERROR'])

        this.userRepository = userRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(id: string, body: UserEntity) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, NOT_FOUND, VALIDATION_ERROR } = this.getEventType()

        try {

            const { name, email, password } = body
            const newUser = new UserEntity(id, name, email, password)

            validate(newUser, { validationError: { target: false } }).then(errors => {
                if (errors.length > 0) {
                    this.emit(VALIDATION_ERROR, getErrors(errors))
                } else {

                    this.userRepository.getById(id, (error, user) => {
                        if (error) {
                            this.emit(ERROR_MONGOOSE, error)
                        }
                        else {

                            if (user === null) {
                                this.emit(NOT_FOUND, null)
                            }
                            else {

                                this.userRepository.save(toUpdate(newUser, user), (error, userUpdated) => {
                                    if (error) {
                                        this.emit(ERROR_MONGOOSE, error)
                                    }
                                    else {
                                        const { id, name, email, password, created_at, updated_at } = toEntity(userUpdated)

                                        this.emit(SUCCESS, { id, name, email, password, created_at, updated_at })
                                    }

                                })
                            }
                        }
                    })
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default UpdateUserService