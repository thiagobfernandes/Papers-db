import { Papers } from "../entities/papers";


export namespace UpdatePapersRepositoryProtocol {
    export type Params = {
        title: string;
        language: string;
        platformId: number;
  
    }
    export type Response = Promise<void>

}
export interface UpdatePapersRepositoryProtocolInterface {
    execute(params: UpdatePapersRepositoryProtocol.Params, papersId: number, userId: number): UpdatePapersRepositoryProtocol.Response;
}