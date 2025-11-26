import { Papers } from "../entities/papers";


export namespace FindPapersByIdRepositoryProtocol {
    export type Params ={
       id:number;
    }
    export type Response = Papers | null

}
export interface FindPapersByIdRepositoryProtocolInterface {
    execute(params: FindPapersByIdRepositoryProtocol.Params): Promise<FindPapersByIdRepositoryProtocol.Response>;
}