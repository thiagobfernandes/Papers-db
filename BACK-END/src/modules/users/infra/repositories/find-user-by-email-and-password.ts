import { User } from "../../domain/entities/user";
import { FindUserByEmailAndPassowordRepositoryProtocol, FindUserByEmailAndPassowordRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-email-and-password";
import UserEntity from "../entities/user-entity";

export class FindUserByEmailAndPasswordRepository implements FindUserByEmailAndPassowordRepositoryProtocolInterface {
    async execute(params: FindUserByEmailAndPassowordRepositoryProtocol.Params): FindUserByEmailAndPassowordRepositoryProtocol.Response {
        const userEntity = await UserEntity.findOne({
            where: { email: params.email, password:params.password },
        });
        
        return userEntity ? User.fromEntity(userEntity) : null;
    }
}
