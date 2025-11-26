import { User } from "../../domain/entities/user";
import { FindUserByEmailRepositoryProtocol, FindUserByEmailRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-email";
import UserEntity from "../entities/user-entity";

export class FindUserByEmailRepository implements FindUserByEmailRepositoryProtocolInterface {
    async execute(params: FindUserByEmailRepositoryProtocol.Params): FindUserByEmailRepositoryProtocol.Response {
        const userEntity = await UserEntity.findOne({
            where: { email: params.email },
        });
        
        return userEntity ? User.fromEntity(userEntity) : null;
    }
}
