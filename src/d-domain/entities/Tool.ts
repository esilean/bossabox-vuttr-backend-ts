import { IsDate, IsNotEmpty, MaxLength, ArrayUnique } from 'class-validator'

export default class Tool {

    private _id: string = ''

    @IsNotEmpty()
    @MaxLength(100)
    private _title: string

    @IsNotEmpty()
    @MaxLength(255)
    private _link: string

    @IsNotEmpty()
    @MaxLength(1000)
    private _description: string

    @MaxLength(20, { each: true })
    @ArrayUnique()
    private _tags: Array<string>

    @IsDate()
    private _created_at: Date = new Date()

    @IsDate()
    private _updated_at: Date = new Date()

    constructor(id: string, title: string, link: string, description: string, tags: Array<string>) {
        this._id = id
        this._title = title
        this._link = link
        this._description = description
        this._tags = tags
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }
    get link() {
        return this._link
    }
    get description() {
        return this._description
    }
    get tags() {
        return this._tags
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