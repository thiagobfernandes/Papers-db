import { badRequest, Controller, ok } from "../../../shared/http/protocols";
import { FindOneByIdPapersUsecaseProtocolInterface } from "../application/protocols/find-papers-by-id";



export class FindPapersByIdController {
    constructor(private readonly findOnePapersById: FindOneByIdPapersUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const { id } = req.params

            const foundPapers = await this.findOnePapersById.execute({ id })
            if (!foundPapers) {
                return badRequest({ message: "Papers não encontrado", messageDev: "Papers não encontrado", method: "FindPapersByIdController.handle" })
            }
            return ok({
                content: foundPapers,
                message: "Paper encontrados com sucesso",
                status: 200
            })

        } catch (error) {
            throw error
        }
    }



}