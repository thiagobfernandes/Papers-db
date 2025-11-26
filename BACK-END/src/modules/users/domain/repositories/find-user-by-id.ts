import { User } from "../entities/user";

export namespace FindUserByIdRepositoryProtocol {
    export type Params = {
        id: number;
    }
    export type Response = Promise<User | null>;
}

export interface FindUserByIdRepositoryProtocolInterface {
    execute(params: FindUserByIdRepositoryProtocol.Params): FindUserByIdRepositoryProtocol.Response;
}
