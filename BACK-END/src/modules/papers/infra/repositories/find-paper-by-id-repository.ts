import { not } from "joi";
import { toDomain } from "../../../../shared/helpers/to-domain";
import { Papers } from "../../domain/entities/papers";
import { FindPapersByIdRepositoryProtocol, FindPapersByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import PapersEntity from "../entities/papers-entity";
import { notFound } from "../../../../shared/http/protocols";


export class FindPaperByIdRepository implements FindPapersByIdRepositoryProtocolInterface {

    async execute(params: FindPapersByIdRepositoryProtocol.Params): Promise<FindPapersByIdRepositoryProtocol.Response> {
        const papers = await PapersEntity.findByPk(params.id, {
            include: ["user"],
        });
        if (!papers) {
            return null;
        }
        return Papers.fromEntity(papers)
    }

}