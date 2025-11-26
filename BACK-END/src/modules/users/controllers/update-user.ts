import { badRequest, Controller, ok } from "../../../shared/http/protocols";
import { UserCreateSchema, UserUpdateSchema } from "../../../shared/schemas/user-schema";
import { messageError } from "../../../shared/helpers/message-error";
import { UpdateUserUsecaseProtocolInterface, UpdateUserProtocol } from "../application/protocols/update-user-protocol";
import { Logger } from "../../../shared/helpers/logger";

export class UpdateUserController {

    constructor(private readonly updateUserUsecase: UpdateUserUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {

            const { id } = req.params;
            if (!id) {
                return badRequest({
                    message: "User ID is required",
                    messageDev: "Missing user ID in params",
                    method: "UpdateUserController.handle"
                });
            }

            const result = UserUpdateSchema.safeParse(req.body);
            if (!result.success) {
                Logger.error(`UpdateUserController: Validation Error - ${JSON.stringify(result.error)}`);
                return badRequest({
                    message: messageError(result.error),
                    messageDev: "Validation Error",
                    method: "UpdateUserController.handle"
                });
            }

            const userData = this.extractUserData(req);
            const updatedUser = await this.updateUserUsecase.execute(userData, id);

            return ok({
                content: updatedUser,
                message: "Usuário atualizado com sucesso",
                status: 200
            });

        } catch (error) {
            Logger.error(`UpdateUserController: Error occurred - ${JSON.stringify(error)}`);
            throw error;
        }
    }

    private extractUserData(req: Controller.Params): UpdateUserProtocol.Params {
        const {
            name,
            username,
            email,
            isAdmin,
            cpf,
            primaryPhone,
            secondaryPhone,
            dateOfBirth,
            genre
        } = req.body;

        return {
            name,
            username,
            isAdmin,
            email,
            cpf,
            primaryPhone,
            secondaryPhone,
            dateOfBirth,
            genre
        };
    }
}
