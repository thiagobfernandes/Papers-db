
export namespace DeletePlatformRepositoryProtocol {
    export type Params = {
       platformId:number;
    }
    export type Response = Promise<void>
}
export interface DeletePlatformRepositoryProtocolInterface {
    execute(params: DeletePlatformRepositoryProtocol.Params): DeletePlatformRepositoryProtocol.Response;
}