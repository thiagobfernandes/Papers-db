import { Platform } from "../../domain/entities/platform";


export namespace FindPlatformPaginationProtocol {
    export type Params = {
        search?: Record<string, any>;
        filter?: Record<string, any>;
        order?: Record<string, any>;
        page?: number;
        pageSize?: number;
    }
    export type Response = Promise<{
        total: number;
        page: number;
        pageSize: number;
        platforms: Platform[]
    }>


}

export interface FindPlatformPaginationUsecaseProtocolInterface {
    execute(params: FindPlatformPaginationProtocol.Params): FindPlatformPaginationProtocol.Response;
}