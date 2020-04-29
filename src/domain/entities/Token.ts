import { v4 as uuid } from 'uuid'
import { Length, IsEmail, IsDate } from 'class-validator'

export default class Token {

    @IsEmail()
    @Length(1)
    email: string

    @Length(3)
    password: string

    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

}