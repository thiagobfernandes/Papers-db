import { badRequest, Controller, ok } from "../../../shared/http/protocols";
import { CreateUserUsecaseProtocolInterface, CreateUserProtocol } from "../application/protocols/create-user-protocol";
import { Logger } from "../../../shared/helpers/logger";
import { messageError } from "../../../shared/helpers/message-error";
import { UserCreateSchema } from "../../../shared/schemas/user-schema";

export class CreateUserController {

    constructor(private readonly createUserUsecase: CreateUserUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            const result = UserCreateSchema.safeParse(req.body);
            if (!result.success) {
                Logger.error(`CreateUserController: Validation Error - ${JSON.stringify(result.error)}`);
                return badRequest({ message: messageError(result.error), messageDev: "Validation Error", method: "CreateUserController.handle" })
            }
            
            const user = await this.createUserUsecase.execute(this.extractUserData(req));
            return ok({
                content: user,
                message: "Usuário criado com sucesso",
                status: 201
            })

        } catch (error) {
            Logger.error(`CreateUserController: Error occurred - ${JSON.stringify(error)}`);
            throw error;
        }
    }

    private extractUserData(req: Controller.Params): CreateUserProtocol.Params {
        const { name, username, email, password, cpf, primaryPhone, secondaryPhone, dateOfBirth, genre } = req.body;
        return { name, username, email, password, cpf, primaryPhone, secondaryPhone, dateOfBirth, genre };
    }
}
