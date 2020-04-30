import { ValidateIf, IsEmail, IsDate, IsNotEmpty } from 'class-validator'

export default class User {

    private _id: string = ''

    @IsNotEmpty()
    private _name: string

    @IsEmail()
    @IsNotEmpty()
    private _email: string

    @ValidateIf(o => o._id === '')
    @IsNotEmpty()
    private _password: string

    @IsDate()
    private _created_at: Date = new Date()

    @IsDate()
    private _updated_at: Date = new Date()

    constructor(id: string, name: string, email: string, password: string) {
        this._id = id
        this._name = name
        this._email = email
        this._password = password
    }

    get id() {
        return this._id
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
    get created_at() {
        return this._created_at
    }
    get updated_at() {
        return this._updated_at
    }
    set created_at(created_at) {
        this._created_at = created_at
    }
    set updated_at(_updated_at) {
        this._updated_at = _updated_at
    }

}