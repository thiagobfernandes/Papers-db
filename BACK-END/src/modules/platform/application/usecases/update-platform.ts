import { notFound } from "../../../../shared/http/protocols";
import { Platform } from "../../domain/entities/platform";
import { FindOnePlatformByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import { UpdatePlatformRepositoryProtocolInterface } from "../../domain/repositories/update-platform";
import { UpdatePlatformProtocol, UpdatePlatformUsecaseProtocolInterface } from "../protocols/update-platform-protocol";


export class UpdatePlatformUseCase implements UpdatePlatformUsecaseProtocolInterface {

    constructor(private readonly updatePlatformRepository: UpdatePlatformRepositoryProtocolInterface,
        private readonly findPlatformByIdRepository: FindOnePlatformByIdRepositoryProtocolInterface
    ) {
    }

    async execute(params: UpdatePlatformProtocol.Params, id: number): UpdatePlatformProtocol.Response {
        const platform = Platform.create(params);
        await this.updatePlatformRepository.execute(platform, id)
        const updatedPlatform = await this.findPlatformByIdRepository.execute({ id });
        if (!updatedPlatform) {
            throw notFound({ message: "Platform not found" });
        }
        return updatedPlatform

    }
}