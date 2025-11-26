import { notFound } from "../../../../shared/http/protocols";
import { Papers } from "../../domain/entities/papers";
import { FindPapersByUserIdAndPapersIdRepositoryProtocol, FindPapersByUserIdAndPapersIdRepositoryProtocolInterface } from "../../domain/repositories/find-papers-by-user-id-and-papers-id";
import PapersEntity from "../entities/papers-entity";


export class FindPapersByUserIdAndPapersIdRepository implements FindPapersByUserIdAndPapersIdRepositoryProtocolInterface {


    async execute(params: FindPapersByUserIdAndPapersIdRepositoryProtocol.Params): Promise<FindPapersByUserIdAndPapersIdRepositoryProtocol.Response> {
        const papers = await PapersEntity.findOne({
            where: { userId: params.userId, id: params.papersId },
            include: ["user"]
        })

        if (!papers) {
            return null;
        }
        return Papers.fromEntity(papers);
    }

}