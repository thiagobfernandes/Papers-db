import { Controller, ok } from "../../../shared/http/protocols";
import { FindUserByIdUsecaseProtocolInterface, FindUserByIdProtocol } from "../application/protocols/find-user-by-id-protocol";
import { Logger } from "../../../shared/helpers/logger";

export class FindUserByIdController {

    constructor(private readonly findUserByIdUsecase: FindUserByIdUsecaseProtocolInterface) { }

    async handle(req: Controller.Params): Promise<Controller.Response> {
        try {
            
            const user = await this.findUserByIdUsecase.execute(this.extractUserData(req));
            return ok({
                content: user,
                message: "Usuário encontrado com sucesso",
                status: 200
            })

        } catch (error) {
            Logger.error(`FindUserByIdController: Error occurred - ${JSON.stringify(error)}`);
            throw error;
        }
    }

    private extractUserData(req: Controller.Params): FindUserByIdProtocol.Params {
        const { id } = req.params;
        return { id: Number(id) };
    }
}
