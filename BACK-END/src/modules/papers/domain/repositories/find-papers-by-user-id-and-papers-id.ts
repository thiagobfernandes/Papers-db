import { Papers } from "../entities/papers";



export namespace FindPapersByUserIdAndPapersIdRepositoryProtocol {
    export type Params ={
       userId:number;
       papersId:number;
    }
    export type Response = Papers | null

} 
export interface FindPapersByUserIdAndPapersIdRepositoryProtocolInterface {
    execute(params: FindPapersByUserIdAndPapersIdRepositoryProtocol.Params): Promise<FindPapersByUserIdAndPapersIdRepositoryProtocol.Response>;
}