import { Controller, ok } from "../../../shared/http/protocols";
import { FindOneByIdPlatformUsecaseProtocolInterface } from "../application/protocols/find-platform-by-id";



export class FindPlatformByIdController {
    constructor(private readonly findOnePlatformById: FindOneByIdPlatformUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const { id } = req.params

            const foundPlatform = await this.findOnePlatformById.execute({ id })
             return ok({
                content: foundPlatform,
                message: "Plataforma encontrada com sucesso",
                status: 200
            })

        } catch (error) {
            throw error
        }
    }



}