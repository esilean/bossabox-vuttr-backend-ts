import { ICreateUserService } from "./interfaces/IUserService"

import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"
import UserEntity from "../../d-domain/entities/User"
import { IUserModel } from "../../e-infra/data/database/models/interfaces/user.interface"

import { validate } from 'class-validator'

import Operation from '../Operation'

class CreateUserService extends Operation implements ICreateUserService {

    private readonly _userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        super(['SUCCESS', 'ERROR', 'VALIDATION_ERROR'])

        this._userRepository = userRepository
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(body: UserEntity) {

        const { SUCCESS, ERROR, VALIDATION_ERROR } = this.getEventType()

        try {

            const { name, email, password } = body
            const newUser = new UserEntity(name, email, password)

            validate(newUser).then(errors => {
                if (errors.length > 0) {
                    this.emit(VALIDATION_ERROR, errors)
                } else {

                    // map Entity to DB
                    const user = <IUserModel>{
                        name,
                        email,
                        password
                    }

                    this._userRepository.create(user, (error, result) => {
                        if (error) {
                            this.emit(ERROR, error)
                        }
                        else {

                            // map DB to Entity





                            this.emit(SUCCESS, result)
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