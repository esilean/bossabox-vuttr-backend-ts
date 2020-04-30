import { ICreateUserService } from "./interfaces/IUserService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import { toDB, toEntity } from './UserMapper'
import UserEntity from "../../d-domain/entities/User"

import { validate } from 'class-validator'
import { getErrors } from '../ErrorValidation'

class CreateUserService extends Operation implements ICreateUserService {

    private readonly _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'VALIDATION_ERROR'])

        this._userRepository = userRepository
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

                    this._userRepository.create(toDB(newUser), (error, result) => {
                        if (error) {
                            this.emit(ERROR_MONGOOSE, error)
                        }
                        else {

                            const { id, name, email, password, created_at, updated_at } = toEntity(result)

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