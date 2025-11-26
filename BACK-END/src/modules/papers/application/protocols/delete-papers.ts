export namespace DeletePapersUsecaseProtocol {
    export type Params ={
       papersId:number;
    }
    export type Response = Promise<void>
}
export interface DeletePapersUsecaseProtocolInterface {
    execute(params: DeletePapersUsecaseProtocol.Params): DeletePapersUsecaseProtocol.Response;
}