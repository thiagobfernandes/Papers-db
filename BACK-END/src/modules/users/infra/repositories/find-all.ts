import { FindAllUserRepositoryProtocol, FindAllUserRepositoryProtocolInterface } from "../../domain/repositories/findall";
import UserEntity from "../entities/user-entity";

export class FindAllUserRepository implements FindAllUserRepositoryProtocolInterface {

    async execute(): FindAllUserRepositoryProtocol.Response {
        const users = await UserEntity.findAll()
        return users;
    }

}


