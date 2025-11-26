import { notFound } from "../../../../shared/http/protocols";
import { Papers } from "../../domain/entities/papers";
import { FindPapersByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import { UpdatePapersRepositoryProtocolInterface } from "../../domain/repositories/update-papers";
import { UpdatePapersProtocol, UpdatePapersUsecaseProtocolInterface } from "../protocols/update-papers-protocol";


export class UpdatePapersUseCase implements UpdatePapersUsecaseProtocolInterface {

    constructor(private readonly updatePapersRepository: UpdatePapersRepositoryProtocolInterface,
        private readonly findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface
    ) {
    }

    async execute(params: UpdatePapersProtocol.Params, id: number, userId: number): UpdatePapersProtocol.Response {
        const papers = Papers.create(params);
        await this.updatePapersRepository.execute(papers, id, userId)
        const updatedPapers = await this.findPapersByIdRepository.execute({ id });
        if (!updatedPapers) {
            throw notFound({ message: "Papers not found" });
        }
        return updatedPapers
    }
}