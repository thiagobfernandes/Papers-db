import { Logger } from "../../../../shared/helpers/logger";
import { notFound } from "../../../../shared/http/protocols";
import { User } from "../../domain/entities/user";
import { UpdateUserRepositoryProtocol, UpdateUserRepositoryProtocolInterface } from "../../domain/repositories/update-user";
import UserEntity from "../entities/user-entity";

export class UpdateUserRepository implements UpdateUserRepositoryProtocolInterface {
    async execute(params: UpdateUserRepositoryProtocol.Params, userId: number): UpdateUserRepositoryProtocol.Response {
         await UserEntity.update(params, {
            where: { id: userId },
        });
        const userEntity = await UserEntity.findByPk(userId);
        if (!userEntity) {
            throw notFound({ message: 'User not found', messageDev: 'User not found', method: 'UpdateUserRepository.execute' });
        }
        Logger.info(`UpdateUserRepository: User ID ${userId} updated successfully.`);
        return User.fromEntity(userEntity);
    }
}
