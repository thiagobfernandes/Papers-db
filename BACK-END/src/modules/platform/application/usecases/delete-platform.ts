import { DeletePlatformRepositoryProtocolInterface } from "../../domain/repositories/delete-platform";
import { DeletePlatformUsecaseProtocol, DeletePlatformUsecaseProtocolInterface } from "../protocols/delete-platform";


export class DeletePlatformUsecase implements DeletePlatformUsecaseProtocolInterface {

    constructor(private readonly deletePlatformRepository: DeletePlatformRepositoryProtocolInterface) { }

    execute(params: DeletePlatformUsecaseProtocol.Params): DeletePlatformUsecaseProtocol.Response {
        return this.deletePlatformRepository.execute({ platformId: params.platformId });
    }
}