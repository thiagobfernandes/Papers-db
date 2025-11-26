import { Platform } from "../entities/platform";

export namespace FindPlatformPaginationRepositoryProtocol {
    export type Params = {
        search?: Record<string, any>;
        filter?: Record<string, any>;
        order?: Record<string, any>;
        page?: number;
        pageSize?: number;
    }

    export type Response = {
        total: number;
        page: number;
        pageSize: number;
        platforms: Platform[];
    }

}
export interface FindPlatformPaginationRepositoryProtocolInterface {
    execute(params: FindPlatformPaginationRepositoryProtocol.Params): Promise<FindPlatformPaginationRepositoryProtocol.Response>;
}