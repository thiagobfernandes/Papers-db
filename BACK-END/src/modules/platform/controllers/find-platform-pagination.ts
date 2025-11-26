import { FindPlatformPaginationProtocol, FindPlatformPaginationUsecaseProtocolInterface } from "../application/protocols/find-platform-pagination";
import { badRequest, Controller, ok } from "../../../shared/http/protocols";
import { PlatformFindPaginationSchema } from "../../../shared/schemas/platform-schema";
import { messageError } from "../../../shared/helpers/message-error";
import { Logger } from "../../../shared/helpers/logger";



export class FindPlatformPaginationController {
    constructor(private readonly findPlatformPaginationUsecase: FindPlatformPaginationUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            Logger.info("FindPlatformPaginationController: Handling request");
            const platformData = this.extractPlatformDataQuery(req);
            const foundPlatform = await this.findPlatformPaginationUsecase.execute(platformData)
            Logger.info("FindPlatformPaginationController: Successfully retrieved platforms");
            return ok({
                content: foundPlatform,
                message: "Plataformas encontradas com sucesso",
                status: 200
            })

        } catch (error) {
            Logger.error(`FindPlatformPaginationController: Error occurred - ${JSON.stringify(error)}`);
            throw error
        }


    }

    private extractPlatformDataQuery(req: Controller.Params): FindPlatformPaginationProtocol.Params {
        const query = req.query || {};
        const { page, pageSize, search, filter, order } = query as Partial<FindPlatformPaginationProtocol.Params>;

        return {
            page: page ?? 1,
            pageSize: pageSize ?? 10,
            search,
            filter,
            order
        };
    }

}