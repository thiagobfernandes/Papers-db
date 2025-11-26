import { User } from "../../domain/entities/user";

export namespace UpdateUserProtocol {
    export type Params = {
        name?: string;
        username?: string;
        email?: string;
        password?: string; 
        isAdmin?: boolean;
        cpf?: string;
        primaryPhone?: string;
        secondaryPhone?: string;
        dateOfBirth?: Date;
        genre?: string;
    }
    export type Response = Promise<User & { accessToken?: string }>;
}

export interface UpdateUserUsecaseProtocolInterface {
    execute(params: UpdateUserProtocol.Params, id:number): UpdateUserProtocol.Response;
}