import passport, { PassportStatic } from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import IAuth from './interfaces/IAuth'
import IConfig from '../../../../config/interfaces/IConfig'

export default class Auth implements IAuth {

    _passport: PassportStatic

    constructor(config: IConfig) {

        const opt = Object.create(null)

        opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
        opt.secretOrKey = config.authSecret
        // opt.issuer = ''
        // opt.audience = ''

        const strategy = new Strategy(opt, async function (payload, done) {
            try {

                const user = true //await userRepository.getById(payload.id)

                if (user !== null)
                    done(null, user)
                else
                    done(null, false)

            } catch (error) {
                done(error, null)
            }
        })

        this._passport = passport

        this._passport.use(strategy)

        this._passport.serializeUser<any, any>(function (user, done) {
            done(null, user)
        })

        this._passport.deserializeUser(function (user, done) {
            done(null, user)
        })


    }

    initialize() {
        return this._passport.initialize()
    }

    authenticate() {
        return this._passport.authenticate('jwt', { session: false })
    }

}