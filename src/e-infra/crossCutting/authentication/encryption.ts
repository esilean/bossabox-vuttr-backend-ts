import bcrypt from 'bcrypt'

export function encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

export function comparePassword(password: string, encodedPassword: string) {
    return bcrypt.compareSync(password, encodedPassword)
}

