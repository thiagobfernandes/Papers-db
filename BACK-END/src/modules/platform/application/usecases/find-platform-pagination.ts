import { FindPlatformPaginationRepositoryProtocolInterface } from "../../domain/repositories/find-platform-pagination";
import { Logger } from "../../../../shared/helpers/logger";
import { FindPlatformPaginationProtocol, FindPlatformPaginationUsecaseProtocolInterface } from "../protocols/find-platform-pagination";

export class FindPlatformPaginationUsecase implements FindPlatformPaginationUsecaseProtocolInterface {
    constructor(private readonly findPlatformPaginationRepository: FindPlatformPaginationRepositoryProtocolInterface) { }
    async execute(params: FindPlatformPaginationProtocol.Params): FindPlatformPaginationProtocol.Response {
        Logger.info("FindPlatformPaginationUsecase: Executing use case with params:"  + params);
        const result = await this.findPlatformPaginationRepository.execute(params);
        Logger.info("FindPlatformPaginationUsecase: Retrieved " + result.platforms.length + " platforms");
        return result;

    }
}