import { DeletePlatformRepositoryProtocol, DeletePlatformRepositoryProtocolInterface } from "../../domain/repositories/delete-platform";
import PlatformEntity from "../entities/platform-entity";



export class DeletePlatformRepository implements DeletePlatformRepositoryProtocolInterface {

    async execute(params: DeletePlatformRepositoryProtocol.Params): DeletePlatformRepositoryProtocol.Response {
        await PlatformEntity.destroy({
            where: { id: params.platformId }
        });
    }


}