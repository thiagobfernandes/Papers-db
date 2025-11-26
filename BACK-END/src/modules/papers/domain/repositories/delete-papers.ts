

export namespace DeletePapersRepositoryProtocol {
    export type Params ={
       papersId:number;
    }
    export type Response = Promise<void>
}
export interface DeletePapersRepositoryProtocolInterface {
    execute(params: DeletePapersRepositoryProtocol.Params): DeletePapersRepositoryProtocol.Response;
}