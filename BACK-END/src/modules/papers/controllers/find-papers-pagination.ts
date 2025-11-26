import { FindPapersPaginationProtocol, FindPapersPaginationUsecaseProtocolInterface } from "../application/protocols/find-papers-pagination";
import {  Controller, ok } from "../../../shared/http/protocols";
import { Logger } from "../../../shared/helpers/logger";



export class FindPapersPaginationController {
    constructor(private readonly findPapersPaginationUsecase: FindPapersPaginationUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            Logger.info("FindPapersPaginationController: Handling request");
            const papersData = this.extractPapersDataQuery(req);
            const foundPapers = await this.findPapersPaginationUsecase.execute(papersData)
            Logger.info("FindPapersPaginationController: Successfully retrieved papers");
            return ok({
                content: foundPapers,
                message: "Papers encontrados com sucesso",
                status: 200
            })

        } catch (error) {
            Logger.error(`FindPapersPaginationController: Error occurred - ${JSON.stringify(error)}`);
            throw error
        }


    }

    private extractPapersDataQuery(req: Controller.Params): FindPapersPaginationProtocol.Params {
        const query = req.query || {};
        const isAdmin = req.isAdmin ?? false
        const { page, pageSize, search, filter, order,  } = query as Partial<FindPapersPaginationProtocol.Params>;

        return {
            page: page ?? 1,
            pageSize: pageSize ?? 10,
            search,
            isAdmin,
            filter,
            order
        };
    }

}