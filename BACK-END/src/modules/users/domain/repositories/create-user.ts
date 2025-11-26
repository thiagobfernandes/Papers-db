import { User } from "../entities/user";

export namespace CreateUserRepositoryProtocol {
    export type Params = User;
    export type Response = Promise<User>;
}

export interface CreateUserRepositoryProtocolInterface {
    execute(params: CreateUserRepositoryProtocol.Params): CreateUserRepositoryProtocol.Response;
}
