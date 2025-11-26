import { PublisherServiceInterface } from "../../../../shared/queue/queue";
import { appConfig } from "../../../../shared/schemas/app-config-env";
import { FindAllUserRepositoryProtocolInterface } from "../../../users/domain/repositories/findall";
import { Papers } from "../../domain/entities/papers";
import { CreatePapersRepositoryProtocolInterface } from "../../domain/repositories/create-papers";
import { CreatePapersProtocol, CreatePapersUsecaseProtocolInterface } from "../protocols/create-papers";

const config = appConfig.loadConfig()

export class CreatePapersUseCase implements CreatePapersUsecaseProtocolInterface {

    constructor(private readonly createPapersRepository: CreatePapersRepositoryProtocolInterface,
        private readonly publisher: PublisherServiceInterface,
        private readonly findAllUserRepository: FindAllUserRepositoryProtocolInterface
    ) {
    }

    async execute(params: CreatePapersProtocol.Params, userId: number): Promise<CreatePapersProtocol.Response> {
        const papers = Papers.create(params);
        const paperCreatedEntity = await this.createPapersRepository.execute(papers, userId);

        const users = await this.findAllUserRepository.execute();
        for await (const user of users) {
            await this.publisher.publish("papers:created", {
                to: user.email,
                subject: 'Novo Paper Criado',
                body: `Olá ${user.name}, um novo paper intitulado "${papers.title}" foi criado na plataforma.`,
                name: user.name,
                author: paperCreatedEntity.user ? paperCreatedEntity.user.name : 'Desconhecido',
                link: `${config.BACKEND_URL}/${paperCreatedEntity.documentPath}`,
            });
        }
        return papers;
    }
}