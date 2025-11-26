export namespace DeletePlatformUsecaseProtocol {
    export type Params = {
       platformId:number;
    }
    export type Response = Promise<void>
}
export interface DeletePlatformUsecaseProtocolInterface {
    execute(params: DeletePlatformUsecaseProtocol.Params): DeletePlatformUsecaseProtocol.Response;
}