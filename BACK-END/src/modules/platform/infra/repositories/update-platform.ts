import { UpdatePlatformRepositoryProtocol, UpdatePlatformRepositoryProtocolInterface } from "../../domain/repositories/update-platform";
import PlatformEntity from "../entities/platform-entity";


export class UpdatePlatformRepository implements UpdatePlatformRepositoryProtocolInterface {

    async execute(
        params: UpdatePlatformRepositoryProtocol.Params,
        platformId: number,
    ): Promise<void> {
        await PlatformEntity.update(
            {
                ...params
            },
            {
                where: { id: platformId }
            }
        );
    }
}