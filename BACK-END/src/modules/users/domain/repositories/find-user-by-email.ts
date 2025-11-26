import { User } from "../entities/user";

export namespace FindUserByEmailRepositoryProtocol {
    export type Params = {
        email: string;
    }
    export type Response = Promise<User | null>;
}

export interface FindUserByEmailRepositoryProtocolInterface {
    execute(params: FindUserByEmailRepositoryProtocol.Params): FindUserByEmailRepositoryProtocol.Response;
}
