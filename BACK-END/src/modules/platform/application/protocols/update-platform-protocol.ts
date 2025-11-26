import { Platform } from "../../domain/entities/platform";

export namespace UpdatePlatformProtocol {
    export type Params = {
        name: string;
    }
    export type Response = Promise<Platform>
}

export interface UpdatePlatformUsecaseProtocolInterface {
    execute(params: UpdatePlatformProtocol.Params, platformId:number): UpdatePlatformProtocol.Response;
}