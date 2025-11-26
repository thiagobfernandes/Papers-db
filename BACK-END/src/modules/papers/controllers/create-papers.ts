import { badRequest, Controller, ok, serverError } from "../../../shared/http/protocols";
import { PapersCreateSchema } from "../../../shared/schemas/papers-schema";
import {  CreatePapersUsecaseProtocolInterface } from "../application/protocols/create-papers";
import { messageError } from "../../../shared/helpers/message-error";
import { Logger } from "../../../shared/helpers/logger";


export class CreatePapersController {

    constructor(private readonly createPaperUsecase: CreatePapersUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const result = PapersCreateSchema.safeParse({
                ...req.body,
                platformId: req.body.platformId ? Number(req.body.platformId) : undefined,
                documentPath: req.file ? req.file.filename : undefined 
            })
            if (!result.success) {
                return badRequest({ message: messageError(result.error), messageDev: "Validation Error", method: "CreatePapersController.handle" })
            }
            const userId = this.extractUserFromRequest(req);
            const papers = await this.createPaperUsecase.execute(result.data, userId)
            return ok({
                content: papers,
                message: "Papers criado com sucesso",
                status: 201
            })

        } catch (error) {
            Logger.error(`CreatePapersController: Error occurred - ${JSON.stringify(error)}`);
           throw error
        }
    }
    private extractUserFromRequest(req: Controller.Params) {
        if(req.user === undefined){
            throw badRequest({message: "User not found in request", messageDev: "The user property is missing in the request object", method: "CreatePapersController.extractUserFromRequest"})
        } else if(req.user.id === undefined){
            throw badRequest({message: "User ID not found in request", messageDev: "The user ID is missing in the request object", method: "CreatePapersController.extractUserFromRequest"})
        }
        return req.user.id;
    }




}