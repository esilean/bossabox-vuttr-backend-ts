import UserEntity from "../../../../d-domain/entities/User"
import { IUser } from "../../database/models/interfaces/user.interface"
import UserModel from "../../database/models/user"


const mapper = {



    toDB(userEntity: UserEntity) {

        const { name, email, password } = userEntity

        const user: IUser = new UserModel({
            name,
            email,
            password,
        })

        return user
    }
}