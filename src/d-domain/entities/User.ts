import { v4 as uuid } from 'uuid'
import { Length, IsEmail, IsDate } from 'class-validator'

export default class User {

    @Length(1)
    private __id: string

    @Length(1, 75)
    private _name: string

    @IsEmail()
    @Length(1)
    private _email: string

    @Length(3)
    private _password: string

    @IsDate()
    private _created_at?: Date

    @IsDate()
    private _updated_at?: Date

    constructor(name: string, email: string, password: string, created_at: Date = new Date(), updated_at: Date = new Date(), _id?: string) {
        this.__id = _id || uuid()
        this._name = name
        this._email = email
        this._password = password
        this._created_at = created_at
        this._updated_at = updated_at
    }

    get name() {
        return this._name
    }
    get email() {
        return this._email
    }
    get password() {
        return this._password
    }

}