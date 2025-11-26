import { Platform } from "../../domain/entities/platform";

export namespace CreatePlatformProtocol {
    export type Params = {
      name: string;
    }
    export type Response = Promise<Platform>
}

export interface CreatePlatformUsecaseProtocolInterface {
    execute(params: CreatePlatformProtocol.Params): Promise<CreatePlatformProtocol.Response>;
}

