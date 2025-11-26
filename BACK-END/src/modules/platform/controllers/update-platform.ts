import { badRequest, Controller, ok, serverError } from "../../../shared/http/protocols";
import { PlatformCreateSchema } from "../../../shared/schemas/platform-schema";
import { messageError } from "../../../shared/helpers/message-error";
import { UpdatePlatformUsecaseProtocolInterface } from "../application/protocols/update-platform-protocol";


export class UpdatePlatformController {

    constructor(private readonly updatePlatformUsecase: UpdatePlatformUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {

        try {
            const result = PlatformCreateSchema.safeParse(req.body)
            if (!result.success) {
                return badRequest({ message: messageError(result.error), messageDev: "Validation Error", method: "UpdatePlatformController.handle" })
            }
            const { name } = req.body;
            const { id } = req.params
            if (!id) {
                throw badRequest({ message: "Platform ID is required", messageDev: "Missing platform ID in request params", method: "UpdatePlatformController.handle" })
            }

            const platform = await this.updatePlatformUsecase.execute({ name }, id)
            return ok({
                content: platform,
                message: "Platform updated successfully",
                status: 201
            })

        } catch (error) {
            throw error
        }
    }
}