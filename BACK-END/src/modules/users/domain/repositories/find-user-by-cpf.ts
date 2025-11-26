import { User } from "../entities/user";

export namespace FindUserByCpfRepositoryProtocol {
    export type Params = {
        cpf: string;
    }
    export type Response = Promise<User | null>;
}

export interface FindUserByCpfRepositoryProtocolInterface {
    execute(params: FindUserByCpfRepositoryProtocol.Params): FindUserByCpfRepositoryProtocol.Response;
}
