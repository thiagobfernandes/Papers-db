import { Controller, ok } from "../../../shared/http/protocols"
import { DeletePlatformUsecaseProtocolInterface } from "../application/protocols/delete-platform"

export class DeletePlatformByIdController {
    constructor(private readonly deletePlatformUsecase: DeletePlatformUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const { id } = req.params

            await this.deletePlatformUsecase.execute({platformId: id})

            return ok({
                content: "Deleted with success",
                message: "Platform deleted with success",
                status: 200
            })

        } catch (error) {
            throw error
        }
    }
}