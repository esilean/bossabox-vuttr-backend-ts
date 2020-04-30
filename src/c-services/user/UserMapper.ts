import UserEntity from '../../d-domain/entities/User'
import { IUserModel } from '../../e-infra/data/database/models/interfaces/user.interface'
import UserModel from '../../e-infra/data/database/models/UserModel'

export function toEntity(user: IUserModel) {

    const { id, name, email, password, created_at, updated_at } = user

    const entity: UserEntity = new UserEntity(
        id,
        name,
        email,
        password
    )

    entity.created_at = created_at
    entity.updated_at = updated_at

    return entity
}

export function toDB(entity: UserEntity) {

    const { name, email, password } = entity

    const user: IUserModel = new UserModel({
        name,
        email,
        password,
        updated_at: new Date(),
    })

    return user
}
