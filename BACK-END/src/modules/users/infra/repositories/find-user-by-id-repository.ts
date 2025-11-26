import { User } from "../../domain/entities/user";
import { FindUserByIdRepositoryProtocol, FindUserByIdRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-id";
import UserEntity from "../entities/user-entity";

export class FindUserByIdRepository implements FindUserByIdRepositoryProtocolInterface {
    async execute(params: FindUserByIdRepositoryProtocol.Params): FindUserByIdRepositoryProtocol.Response {
        const userEntity = await UserEntity.findOne({
            where: { id: params.id },
        });
       
        return userEntity ? User.fromEntity(userEntity) : null;
    }
}
