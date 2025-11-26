import { User } from "../entities/user";

export namespace UpdateUserRepositoryProtocol {
   export type Params = {
        name: string;
        username?: string;
        cpf: string;
        isAdmin?: boolean;
        primaryPhone?: string;
        secondaryPhone?: string;
        dateOfBirth: Date;
        genre: string;
    };
    export type Response = Promise<User>;
}

export interface UpdateUserRepositoryProtocolInterface {
    execute(params: UpdateUserRepositoryProtocol.Params, userId:number): UpdateUserRepositoryProtocol.Response;
}
