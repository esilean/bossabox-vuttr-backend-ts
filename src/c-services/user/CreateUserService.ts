import { ICreateUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import { toSave, toEntity } from './UserMapper'
import UserEntity from "../../d-domain/entities/User"

import { validate } from 'class-validator'
import { getErrors } from '../ErrorValidation'

class CreateUserService extends Operation implements ICreateUserService {

    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'VALIDATION_ERROR'])

        this.userRepository = userRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(body: UserEntity) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, VALIDATION_ERROR } = this.getEventType()

        try {

            const { name, email, password } = body
            const newUser = new UserEntity('', name, email, password)

            validate(newUser, { validationError: { target: false } }).then(errors => {
                if (errors.length > 0) {
                    this.emit(VALIDATION_ERROR, getErrors(errors))
                } else {

                    this.userRepository.save(toSave(newUser), (error, user) => {
                        if (error) {
                            this.emit(ERROR_MONGOOSE, error)
                        }
                        else {

                            const { id, name, email, password, created_at, updated_at } = toEntity(user)

                            this.emit(SUCCESS, { id, name, email, password, created_at, updated_at })
                        }
                    })
                }
            })

        } catch (error) {
            this.emit(ERROR, error)
        }
    }
}

export default CreateUserService