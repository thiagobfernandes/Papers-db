import { Controller } from "../../shared/http/protocols";
import { CreateUserController } from "./controllers/create-user";
import { CreateUserUseCase } from "./application/usecases/create-user";
import { FindUserByIdController } from "./controllers/find-user-by-id";
import { FindUserByIdUseCase } from "./application/usecases/find-user-by-id";
import { UpdateUserController } from "./controllers/update-user";
import { UpdateUserUseCase } from "./application/usecases/update-user";
import { CreateUserRepository } from "./infra/repositories/create-user-repository";
import { FindUserByCpfRepository } from "./infra/repositories/find-user-by-cpf-repository";
import { FindUserByEmailRepository } from "./infra/repositories/find-user-by-email-repository";
import { FindUserByIdRepository } from "./infra/repositories/find-user-by-id-repository";
import { UpdateUserRepository } from "./infra/repositories/update-user-repository";
import { jwtToken } from "../../shared/jwt/jwt-token";
import { CacheService } from "../../shared/cache/cache";

export const BuildCreateUserControllerFactory = () => {
    const createUserRepository = new CreateUserRepository();
    const findUserByCpfRepository = new FindUserByCpfRepository();
    const findUserByEmailRepository = new FindUserByEmailRepository();
    const createUserUseCase = new CreateUserUseCase(
        createUserRepository,
        findUserByCpfRepository,
        findUserByEmailRepository
    );
    const controller = new CreateUserController(createUserUseCase);
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest);
};

export const BuildFindUserByIdControllerFactory = () => {
    const findUserByIdRepository = new FindUserByIdRepository();
    const cacheService = new CacheService();
    const findUserByIdUseCase = new FindUserByIdUseCase(findUserByIdRepository, cacheService);
    const controller = new FindUserByIdController(findUserByIdUseCase);
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest);
};

export const BuildUpdateUserControllerFactory = () => {
    const jwtService = new jwtToken();
    const cacheService = new CacheService();
    const findUserByIdRepository = new FindUserByIdRepository();
    const findUserByCpfRepository = new FindUserByCpfRepository();
    const updateUserRepository = new UpdateUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        findUserByIdRepository,
        findUserByCpfRepository,
        updateUserRepository,
        jwtService,
        cacheService
    );
    const controller = new UpdateUserController(updateUserUseCase);
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest);
};