import { User } from "../entities/user";

export namespace FindUserByEmailAndPassowordRepositoryProtocol {
    export type Params = {
        email: string;
        password: string;
    }
    export type Response = Promise<User | null>;
}

export interface FindUserByEmailAndPassowordRepositoryProtocolInterface {
    execute(params: FindUserByEmailAndPassowordRepositoryProtocol.Params): FindUserByEmailAndPassowordRepositoryProtocol.Response;
}
