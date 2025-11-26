import { Platform } from "../../domain/entities/platform";

export namespace FindOneByIdPlatformProtocol {
    export type Params ={
       id:number;
    }
    export type Response = Promise<Platform | null>
}
export interface FindOneByIdPlatformUsecaseProtocolInterface {
    execute(params: FindOneByIdPlatformProtocol.Params): FindOneByIdPlatformProtocol.Response;
}