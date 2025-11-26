import { Platform } from "../../domain/entities/platform";
import { FindOnePlatformByIdRepositoryProtocol, FindOnePlatformByIdRepositoryProtocolInterface } from "../../domain/repositories/find-one-by-id";
import PlatformEntity from "../entities/platform-entity";
import { notFound } from "../../../../shared/http/protocols";


export class FindPlatformByIdRepository implements FindOnePlatformByIdRepositoryProtocolInterface {

    async execute(params: FindOnePlatformByIdRepositoryProtocol.Params): FindOnePlatformByIdRepositoryProtocol.Response {
        const platform = await PlatformEntity.findByPk(params.id);
        if (!platform) {
            throw notFound({ message: "Platform not found" });
        }
        return Platform.fromEntity(platform)
    }

}