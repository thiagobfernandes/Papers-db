import { FindOnePlatformByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import { FindOneByIdPlatformProtocol, FindOneByIdPlatformUsecaseProtocolInterface } from "../protocols/find-platform-by-id";


export class FindPlatformByIdUsecase implements FindOneByIdPlatformUsecaseProtocolInterface {

    constructor(private readonly findPlatformByIdRepository: FindOnePlatformByIdRepositoryProtocolInterface) { }

    execute(params: FindOneByIdPlatformProtocol.Params): FindOneByIdPlatformProtocol.Response {
        const platform = this.findPlatformByIdRepository.execute({ id: params.id });
        return platform;
    }
}
