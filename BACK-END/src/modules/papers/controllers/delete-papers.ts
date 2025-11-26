import { Controller, ok } from "../../../shared/http/protocols"
import { DeletePapersUsecaseProtocol, DeletePapersUsecaseProtocolInterface } from "../application/protocols/delete-papers"
import { DeletePapersRepositoryProtocolInterface } from "../domain/repositories/delete-papers"



export class DeletePapersByIdController {
    constructor(private readonly deletePapersUsecase: DeletePapersUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const { id } = req.params

            await this.deletePapersUsecase.execute({ papersId: id })

            return ok({
                content: "Deleted with success",
                message: "Paper encontrados com sucesso",
                status: 200
            })

        } catch (error) {
            throw error
        }
    }



}