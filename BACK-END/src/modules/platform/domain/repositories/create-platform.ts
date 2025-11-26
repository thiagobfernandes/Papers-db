import { Platform } from "../entities/platform";


export namespace CreatePlatform {
    export type Params = {
        name: string;
    }
    export type Response = Platform

}
export interface CreatePlatformRepositoryProtocolInterface {
    execute(params: CreatePlatform.Params): Promise<CreatePlatform.Response>;
}
