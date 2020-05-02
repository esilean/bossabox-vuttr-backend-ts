import { IGetTokenService } from "./interfaces/ITokenService"
import IUserRepository from "../../e-infra/data/repositories/user/interfaces/IUserRepository"

import Operation from '../Operation'

import TokenEntity from "../../d-domain/entities/Token"
import { validate } from "class-validator"
import { getErrors } from "../ErrorValidation"
import { comparePassword } from "../../e-infra/crossCutting/authentication/encryption"
import IJwt from "../../e-infra/crossCutting/authentication/interfaces/IJwt"
import IToken from "../../e-infra/crossCutting/authentication/interfaces/IToken"

class GetTokenService extends Operation implements IGetTokenService {

    private readonly userRepository: IUserRepository
    private readonly jwt: IJwt

    constructor(userRepository: IUserRepository, jwt: IJwt) {
        super(['SUCCESS', 'ERROR', 'ERROR_MONGOOSE', 'VALIDATION_ERROR', 'NOT_FOUND'])

        this.userRepository = userRepository
        this.jwt = jwt
    }

    getEventType() {
        return this.getEventTypes()
    }

    execute(body: TokenEntity) {

        const { SUCCESS, ERROR, ERROR_MONGOOSE, VALIDATION_ERROR, NOT_FOUND } = this.getEventType()

        try {

            const { email, password } = body

            const newToken = new TokenEntity(email, password)

            validate(newToken, { validationError: { target: false } }).then(errors => {

                if (errors.length > 0) {
                    this.emit(VALIDATION_ERROR, getErrors(errors))
                } else {

                    this.userRepository.getAll({ email }, (error, result) => {
                        if (error) {
                            this.emit(ERROR_MONGOOSE, error)
                        }
                        else {

                            if (result.length === 0) {
                                const error = new Error('Invalid credentials.')
                                this.emit(NOT_FOUND, error)
                            } else {

                                const user = result[0]

                                const validatePass = comparePassword(password, user.password)
                                if (!validatePass) {
                                    const error = new Error('Invalid credentials.')
                                    this.emit(NOT_FOUND, error)
                                    return
                                }

                                const payload: IToken = { id: user.id, name: user.name, email: user.email }
                                const token = this.jwt.signin(payload)

                                payload.token = token

                                this.emit(SUCCESS, payload)
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

export default GetTokenService