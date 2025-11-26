import { badRequest, Controller, ok } from "../../../shared/http/protocols";
import { PlatformCreateSchema } from "../../../shared/schemas/platform-schema";
import { CreatePlatformUsecaseProtocolInterface } from "../application/protocols/create-platform-protocol";
import { messageError } from "../../../shared/helpers/message-error";
import { Logger } from "../../../shared/helpers/logger";
import { CreatePlatform } from "../domain/repositories/create-platform";


export class CreatePlatformController {

    constructor(private readonly createPlatformUsecase: CreatePlatformUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const result = PlatformCreateSchema.safeParse(req.body)
            if (!result.success) {
                return badRequest({ message: messageError(result.error), messageDev: "Validation Error", method: "CreatePlatformController.handle" })
            }
            const platform = await this.createPlatformUsecase.execute(this.extractPlatformData(req))
            return ok({
                content: platform,
                message: "Plataforma criada com sucesso",
                status: 201
            })

        } catch (error) {
            Logger.error(`CreatePlatformController: Error occurred - ${JSON.stringify(error)}`);
           throw error
        }
    }
    private extractPlatformData(req: Controller.Params) {
        const { name } = req.body as CreatePlatform.Params;
        return { name }
    }



}