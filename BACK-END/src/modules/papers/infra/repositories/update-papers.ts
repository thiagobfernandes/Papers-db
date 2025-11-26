import { FindPapersByUserIdAndPapersIdRepositoryProtocolInterface } from "../../domain/repositories/find-papers-by-user-id-and-papers-id";
import { UpdatePapersRepositoryProtocol, UpdatePapersRepositoryProtocolInterface } from "../../domain/repositories/update-papers";
import { notFound } from "../../../../shared/http/protocols";
import PapersEntity from "../entities/papers-entity";
import { FindPapersByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";


export class UpdatePapersRepository implements UpdatePapersRepositoryProtocolInterface {
    constructor(
        private readonly findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface,
    ) { }

    async execute(
        params: UpdatePapersRepositoryProtocol.Params,
        papersId: number,
        userId: number
    ): Promise<void> {

        const papers = await this.findPapersByIdRepository.execute({id: papersId});

        if (!papers) {
            throw notFound({ message: "Papers not found for this user" });
        }


        await PapersEntity.update(
            {
                ...params,
                platformId: params.platformId
            },
            {
                where: { id: papersId }
            }
        );
    }
}
