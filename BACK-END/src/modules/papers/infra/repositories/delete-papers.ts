import { notFound } from "../../../../shared/http/protocols";
import { DeletePapersRepositoryProtocol, DeletePapersRepositoryProtocolInterface } from "../../domain/repositories/delete-papers";
import { FindPapersByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import PapersEntity from "../entities/papers-entity";



export class DeletePapersRepository implements DeletePapersRepositoryProtocolInterface {
    constructor(private readonly findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface) { }

    async execute(params: DeletePapersRepositoryProtocol.Params): DeletePapersRepositoryProtocol.Response {
        const papers = await this.findPapersByIdRepository.execute({
            id: params.papersId
        });

        if (!papers) {
            throw notFound({ message: "Papers not found" });
        }

        await PapersEntity.destroy({
            where: { id: params.papersId }
        });
    }


}