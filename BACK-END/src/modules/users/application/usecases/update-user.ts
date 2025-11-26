import { User } from "../../domain/entities/user";
import { FindUserByIdRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-id";
import { UpdateUserRepositoryProtocolInterface } from "../../domain/repositories/update-user";
import { UpdateUserProtocol, UpdateUserUsecaseProtocolInterface } from "../protocols/update-user-protocol";
import * as bcrypt from "bcrypt";
import { FindUserByCpfRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-cpf";
import { badRequest, notFound } from "../../../../shared/http/protocols";
import { Logger } from "../../../../shared/helpers/logger";
import { jwtToken } from "../../../../shared/jwt/jwt-token";
import { CacheServiceInterface } from "../../../../shared/cache/cache";

export class UpdateUserUseCase implements UpdateUserUsecaseProtocolInterface {
    private readonly CACHE_KEY_PREFIX = 'user:profile';
    constructor(
        private readonly findUserByIdRepository: FindUserByIdRepositoryProtocolInterface,
        private readonly findUserByCpfRepository: FindUserByCpfRepositoryProtocolInterface,
        private readonly updateUserRepository: UpdateUserRepositoryProtocolInterface,
        private readonly jwtService: jwtToken,
        private readonly cacheService: CacheServiceInterface
    ) { }

    async execute(params: UpdateUserProtocol.Params, userId: number): UpdateUserProtocol.Response {
        Logger.info(`UpdateUserUseCase: Starting update for user ID ${userId}`);

        const userUpdateInstance = await this.userUpdateValidation(params, userId);

        const result = await this.updateUserRepository.execute({
            name: userUpdateInstance.name,
            isAdmin: userUpdateInstance.isAdmin,
            username: userUpdateInstance.username,
            cpf: userUpdateInstance.cpf,
            primaryPhone: userUpdateInstance.primaryPhone,
            secondaryPhone: userUpdateInstance.secondaryPhone,
            dateOfBirth: userUpdateInstance.dateOfBirth,
            genre: userUpdateInstance.genre,

        }, userId);

        const cacheKey = `${this.CACHE_KEY_PREFIX}:${userId}`;
        await this.cacheService.del(cacheKey);

        return {
            ...result,
            accessToken: this.generateNewAcessTokenToNewRole(userUpdateInstance.isAdmin ?? false, userId)
        }
    }

    private async userUpdateValidation(params: UpdateUserProtocol.Params, userId: number): Promise<User> {
        const userToUpdate = await this.findUserByIdRepository.execute({ id: userId });
        if (!userToUpdate) {
            throw notFound({ message: "Usuário não encontrado", messageDev: "User not found", method: "update user", name: "user not found", statusCode: 404 });
        }

        if (params.cpf && params.cpf !== userToUpdate.cpf) {
            const existingUserWithCpf = await this.findUserByCpfRepository.execute({ cpf: params.cpf });
            if (existingUserWithCpf) {
                throw badRequest({ message: "CPF já está em uso por outro usuário", messageDev: "CPF already in use by another user", method: "update user", name: "cpf error", statusCode: 400 });
            }
        }

        if (params.password) {
            const salt = await bcrypt.genSalt(8);
            params.password = await bcrypt.hash(params.password, salt);
        }
        delete userToUpdate.isAdmin
        const userUpdateInstance = User.create({
            ...userToUpdate,
            ...params,
            isAdmin: params.isAdmin,
        });

        return userUpdateInstance
    }

    private generateNewAcessTokenToNewRole(isAdmin: boolean, userId: number): string | undefined {
        if (isAdmin) {
            const token = this.jwtService.generateTokenJwt({ id: userId, isAdmin: true, isMaster: true });
            return token;
        }
        else {
            const token = this.jwtService.generateTokenJwt({ id: userId, isAdmin: false, isMaster: true });
            return token;
        }
    }
}
