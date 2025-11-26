import { DeletePapersRepositoryProtocolInterface } from "../../domain/repositories/delete-papers";
import { DeletePapersUsecaseProtocol, DeletePapersUsecaseProtocolInterface } from "../protocols/delete-papers";


export class DeletePapersUsecase implements DeletePapersUsecaseProtocolInterface {

    constructor(private readonly deletePapersRepository: DeletePapersRepositoryProtocolInterface) { }

    execute(params: DeletePapersUsecaseProtocol.Params): DeletePapersUsecaseProtocol.Response {
        return this.deletePapersRepository.execute({ papersId: params.papersId });
    }
}