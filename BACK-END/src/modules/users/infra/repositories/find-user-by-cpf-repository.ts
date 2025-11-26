import { not } from "joi";
import { Logger } from "../../../../shared/helpers/logger";
import { User } from "../../domain/entities/user";
import { FindUserByCpfRepositoryProtocol, FindUserByCpfRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-cpf";
import UserEntity from "../entities/user-entity";
import { notFound } from "../../../../shared/http/protocols";

export class FindUserByCpfRepository implements FindUserByCpfRepositoryProtocolInterface {
    async execute(params: FindUserByCpfRepositoryProtocol.Params): FindUserByCpfRepositoryProtocol.Response {
        const userEntity = await UserEntity.findOne({
            where: { cpf: params.cpf },
        });
     
        return userEntity ? User.fromEntity(userEntity) : null;
    }
}
