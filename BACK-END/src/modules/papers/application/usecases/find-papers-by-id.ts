import { FindPapersByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import { FindOneByIdPapersProtocol, FindOneByIdPapersUsecaseProtocolInterface } from "../protocols/find-papers-by-id";


export class FindPapersByIdUsecase implements FindOneByIdPapersUsecaseProtocolInterface {

    constructor(private readonly findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface) { }

    execute(params: FindOneByIdPapersProtocol.Params): FindOneByIdPapersProtocol.Response {
        const papers = this.findPapersByIdRepository.execute({ id: params.id });
        return papers;
    }
}