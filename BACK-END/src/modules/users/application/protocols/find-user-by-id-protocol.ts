import { User } from "../../domain/entities/user";

export namespace FindUserByIdProtocol {
    export type Params = {
        id: number;
    }
    export type Response = Promise<User | undefined>;
}

export interface FindUserByIdUsecaseProtocolInterface {
    execute(params: FindUserByIdProtocol.Params): FindUserByIdProtocol.Response;
}