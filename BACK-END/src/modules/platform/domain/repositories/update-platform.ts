import { Platform } from "../entities/platform";


export namespace UpdatePlatformRepositoryProtocol {
    export type Params = {
        name: string;
    }
    export type Response = Promise<void>

}
export interface UpdatePlatformRepositoryProtocolInterface {
    execute(params: UpdatePlatformRepositoryProtocol.Params, platformId: number): UpdatePlatformRepositoryProtocol.Response;
}