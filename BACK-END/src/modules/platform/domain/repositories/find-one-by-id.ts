import { Platform } from "../entities/platform";


export namespace FindOnePlatformByIdRepositoryProtocol {
    export type Params ={
       id: number;
    }
    export type Response = Promise<Platform | null>

}
export interface FindOnePlatformByIdRepositoryProtocolInterface {
    execute(params: FindOnePlatformByIdRepositoryProtocol.Params): FindOnePlatformByIdRepositoryProtocol.Response;
}