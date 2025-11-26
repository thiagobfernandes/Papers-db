import { User } from "../entities/user";


export namespace FindAllUserRepositoryProtocol {
export type Response = Promise<User[]>;
}
export interface FindAllUserRepositoryProtocolInterface {
    execute(): FindAllUserRepositoryProtocol.Response;
}