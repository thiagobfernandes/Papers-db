import { Papers } from "../../domain/entities/papers";


export namespace FindPapersPaginationProtocol {
    export type Params = {
        search?: Record<string, any>;
        filter?: Record<string, any>;
        order?: Record<string, any>;
        page?: number;
        pageSize?: number;
        isAdmin?:boolean
    }
    export type Response = Promise<{
        total: number;
        page: number;
        pageSize: number;
        papers: Papers[]
    }>


}

export interface FindPapersPaginationUsecaseProtocolInterface {
    execute(params: FindPapersPaginationProtocol.Params): FindPapersPaginationProtocol.Response;
}