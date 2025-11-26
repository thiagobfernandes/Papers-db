import { CacheServiceInterface } from "../../../../shared/cache/cache";
import { notFound } from "../../../../shared/http/protocols";
import { User } from "../../domain/entities/user";
import { FindUserByIdRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-id";
import { FindUserByIdProtocol, FindUserByIdUsecaseProtocolInterface } from "../protocols/find-user-by-id-protocol";

export class FindUserByIdUseCase implements FindUserByIdUsecaseProtocolInterface {
    private readonly CACHE_KEY_PREFIX = 'user:profile';
    private readonly CACHE_TTL = 60;

    constructor(private readonly findUserByIdRepository: FindUserByIdRepositoryProtocolInterface,
        private readonly cacheService: CacheServiceInterface
    ) { }

    async execute(params: FindUserByIdProtocol.Params): Promise<User | undefined> {
        const cacheKey = `${this.CACHE_KEY_PREFIX}:${params.id}`;
        const cachedUser = await this.cacheService.get<User>(cacheKey);
        if (cachedUser) {
            return cachedUser;
        }
        const user = await this.findUserByIdRepository.execute(params);

        if (!user) {
            throw notFound({ message: "Usuário não encontrado", messageDev: "User not found", method: "find user by id" })
        }
        await this.cacheService.set<User>(cacheKey, user, this.CACHE_TTL);
        return user;
    }


}
