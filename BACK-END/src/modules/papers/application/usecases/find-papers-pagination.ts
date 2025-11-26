import { FindPapersPaginationRepositoryProtocolInterface } from "../../domain/repositories/find-papers-pagination";
import { Logger } from "../../../../shared/helpers/logger";
import { FindPapersPaginationProtocol, FindPapersPaginationUsecaseProtocolInterface } from "../protocols/find-papers-pagination";

export class FindPaperPaginationUsecase implements FindPapersPaginationUsecaseProtocolInterface {
    constructor(private readonly findPapersPaginationRepository: FindPapersPaginationRepositoryProtocolInterface) { }
    async execute(params: FindPapersPaginationProtocol.Params): FindPapersPaginationProtocol.Response {
        Logger.info("FindPaperPaginationUsecase: Executing use case with params:"  + params);
        const result = await this.findPapersPaginationRepository.execute(params);
        Logger.info("FindPaperPaginationUsecase: Retrieved " + result.papers.length + " papers");
        return result;

    }
}