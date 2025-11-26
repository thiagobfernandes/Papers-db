import { User } from "../../domain/entities/user";

export namespace CreateUserProtocol {
    export type Params = {
        name: string;
        username?: string;
        email: string;
        isAdmin?: boolean;
        password?: string; 
        cpf: string;
        primaryPhone?: string;
        secondaryPhone?: string;
        dateOfBirth: Date;
        genre: string;
    }
    export type Response = Promise<User>;
}

export interface CreateUserUsecaseProtocolInterface {
    execute(params: CreateUserProtocol.Params): CreateUserProtocol.Response;
}