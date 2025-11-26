import { badRequest, Controller, ok, serverError } from "../../../shared/http/protocols";
import { PapersCreateSchema } from "../../../shared/schemas/papers-schema";
import { CreatePapersProtocol, CreatePapersUsecaseProtocolInterface } from "../application/protocols/create-papers";
import { messageError } from "../../../shared/helpers/message-error";
import { UpdatePapersUsecaseProtocolInterface } from "../application/protocols/update-papers-protocol";


export class UpdatePapersController {

    constructor(private readonly updatePaperUsecase: UpdatePapersUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {

        try {
            const result = PapersCreateSchema.safeParse(req.body)
            if (!result.success) {
                return badRequest({ message: messageError(result.error), messageDev: "Validation Error", method: "UpdatePapersController.handle" })
            }
            const data = this.extractPapersData(req);
            const { id } = req.params
            if (!id) {
                throw badRequest({ message: "Papers ID is required", messageDev: "Missing papers ID in request params", method: "UpdatePapersController.extractPapersData" })
            }
            
            if (!req.user || !req.user.id) {
                throw badRequest({ message: "User not authenticated", messageDev: "Missing user in request", method: "UpdatePapersController.handle" })
            }

            const papers = await this.updatePaperUsecase.execute(data, id, req.user.id)
            return ok({
                content: papers,
                message: "Papers atualizado com sucesso",
                status: 201
            })

        } catch (error) {
            throw error
        }
    }
    private extractPapersData(req: Controller.Params) {

        const { title, language, platformId } = req.body as CreatePapersProtocol.Params;

        return { title, language, platformId }
    }



}