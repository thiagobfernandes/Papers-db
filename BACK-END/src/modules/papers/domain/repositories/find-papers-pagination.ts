// import { Papers } from "../entities/papers";

import { Papers } from "../entities/papers";



export namespace FindPapersPaginationRepositoryProtocol {
    export type Params = {
        search?: Record<string, any>;
        filter?: Record<string, any>;
        order?: Record<string, any>;
        page?: number;
        pageSize?: number;
        isAdmin?:boolean
    }

    export type Response = {
        total: number;
        page: number;
        pageSize: number;
        papers: Papers[];
    }

}
export interface FindPapersPaginationRepositoryProtocolInterface {
    execute(params: FindPapersPaginationRepositoryProtocol.Params): Promise<FindPapersPaginationRepositoryProtocol.Response>;
}