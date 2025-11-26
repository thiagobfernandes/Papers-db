import { User } from "../../domain/entities/user";
import { CreateUserRepositoryProtocol, CreateUserRepositoryProtocolInterface } from "../../domain/repositories/create-user";
import UserEntity from "../entities/user-entity";


export class CreateUserRepository implements CreateUserRepositoryProtocolInterface {
    async execute(params: CreateUserRepositoryProtocol.Params): CreateUserRepositoryProtocol.Response {
        const userEntity = await UserEntity.create({
            name: params.name,
            username: params.username,
            email: params.email,
            password: params.password,
            cpf: params.cpf,
            primaryPhone: params.primaryPhone,
            secondaryPhone: params.secondaryPhone,
            dateOfBirth: params.dateOfBirth,
            genre: params.genre,
        });

        return User.fromEntity(userEntity);
    }
}
