import passport, { PassportStatic } from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import IAuth from './interfaces/IAuth'
import IConfig from '../../../../config/interfaces/IConfig'
import IUserRepository from '../../data/repositories/user/interfaces/IUserRepository'

export default class Auth implements IAuth {

    passport: PassportStatic

    constructor(userRepository: IUserRepository, config: IConfig) {

        const opt = Object.create(null)

        opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
        opt.secretOrKey = config.authSecret
        // opt.issuer = ''
        // opt.audience = ''

        const strategy = new Strategy(opt, async function (payload, done) {
            try {

                userRepository.getById(payload.id, function (error, user) {
                    if (user !== null)
                        done(null, user)
                    else
                        done(null, false)
                })

            } catch (error) {
                done(error, null)
            }
        })

        this.passport = passport

        this.passport.use(strategy)

        this.passport.serializeUser<any, any>(function (user, done) {
            done(null, user)
        })

        this.passport.deserializeUser(function (user, done) {
            done(null, user)
        })
    }

    initialize() {
        return this.passport.initialize()
    }

    authenticate() {
        return this.passport.authenticate('jwt', { session: false })
    }

}