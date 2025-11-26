import { Platform } from "../../domain/entities/platform";
import { CreatePlatformRepositoryProtocolInterface } from "../../domain/repositories/create-platform";
import { CreatePlatformProtocol, CreatePlatformUsecaseProtocolInterface } from "../protocols/create-platform-protocol";


export class CreatePlatformUseCase implements CreatePlatformUsecaseProtocolInterface {

    constructor(private readonly createPlatformRepository: CreatePlatformRepositoryProtocolInterface) {
    }

    async execute(params: CreatePlatformProtocol.Params): Promise<CreatePlatformProtocol.Response> {
        const platform = Platform.create(params);
        await this.createPlatformRepository.execute(platform);
        return platform;
    }
}
