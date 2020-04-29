import { v4 as uuid } from 'uuid'
import { Length, IsEmail, IsDate } from 'class-validator'

export default class User {

    @Length(1)
    id: string

    @Length(1, 75)
    name: string

    @IsEmail()
    @Length(1)
    email: string

    @Length(3)
    password: string

    @IsDate()
    created_at: Date

    @IsDate()
    updated_at: Date

    constructor(name: string, email: string, password: string, created_at: Date, updated_at: Date, id?: string) {
        this.id = id || uuid()
        this.name = name
        this.email = email
        this.password = password
        this.created_at = created_at
        this.updated_at = updated_at
    }

}