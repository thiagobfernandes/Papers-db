import { Papers } from "../entities/papers";


export namespace CreatePapersRepositoryProtocol {
    export type Params ={
        title: string; 
        language: string;
        platformId: number;
    }
    export type Response = Promise<Papers>

}
export interface CreatePapersRepositoryProtocolInterface {
    execute(params: CreatePapersRepositoryProtocol.Params,userId:number): CreatePapersRepositoryProtocol.Response;
}