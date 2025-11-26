
import { CreatePlatformRepositoryProtocolInterface, CreatePlatform } from "../../domain/repositories/create-platform";
import PlatformEntity from "../entities/platform-entity";

export class CreatePlatformRepository implements CreatePlatformRepositoryProtocolInterface {
  async execute(params: CreatePlatform.Params): Promise<CreatePlatform.Response> {
    const platform = await PlatformEntity.create({ name: params.name });
    return platform.toJSON() as CreatePlatform.Response;
  }
}
