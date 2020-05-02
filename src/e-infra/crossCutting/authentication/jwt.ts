import jwt from 'jsonwebtoken'
import IConfig from '../../../../config/interfaces/IConfig'
import IToken from './interfaces/IToken'
import IJwt from './interfaces/IJwt'

export default class Jwt implements IJwt {

    private config: IConfig

    constructor(config: IConfig) {
        this.config = config
    }

    signin(payload: IToken) {
        const opt = Object.assign({}, {
            expiresIn: '1 day'
        })
        return jwt.sign(payload, this.config.authSecret, opt)
    }

    verify(token: string) {
        return jwt.verify(token, this.config.authSecret)
    }
}