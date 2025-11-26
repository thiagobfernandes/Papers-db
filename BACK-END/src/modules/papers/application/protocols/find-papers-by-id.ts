import { Papers } from "../../domain/entities/papers";

export namespace FindOneByIdPapersProtocol {
    export type Params ={
       id:number;
    }
    export type Response = Promise<Papers | null>
}
export interface FindOneByIdPapersUsecaseProtocolInterface {
    execute(params: FindOneByIdPapersProtocol.Params): FindOneByIdPapersProtocol.Response;
}