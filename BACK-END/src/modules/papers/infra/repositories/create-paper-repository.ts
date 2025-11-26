import { notFound } from "../../../../shared/http/protocols";
import { FindOnePlatformByIdRepositoryProtocolInterface } from "../../../platform/domain/repositories/find-one-by-id";
import UserEntity from "../../../users/infra/entities/user-entity";
import { CreatePapersRepositoryProtocolInterface, CreatePapersRepositoryProtocol } from "../../domain/repositories/create-papers";
import PapersEntity from "../entities/papers-entity";



export class CreatePapersRepository implements CreatePapersRepositoryProtocolInterface {

    async execute(papers: CreatePapersRepositoryProtocol.Params, userId: number): CreatePapersRepositoryProtocol.Response {

        const createdPaper = await PapersEntity.create({
            ...papers,
            userId: userId,
            platformId: papers.platformId,
            createdAt: new Date(),
        });

        const paperSaved = await PapersEntity.findByPk(createdPaper.id, {
            include: ["user"]
        });

        createdPaper.user = paperSaved?.user as UserEntity;
        return createdPaper;
    }


}