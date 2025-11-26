import { Controller } from "../../shared/http/protocols"
import { CreatePlatformUseCase } from "./application/usecases/create-platform"
import { DeletePlatformUsecase } from "./application/usecases/delete-platform"
import { FindPlatformByIdUsecase } from "./application/usecases/find-platform-by-id"
import { FindPlatformPaginationUsecase } from "./application/usecases/find-platform-pagination"
import { UpdatePlatformUseCase } from "./application/usecases/update-platform"
import { CreatePlatformController } from "./controllers/create-platform"
import { DeletePlatformByIdController } from "./controllers/delete-platform"
import { FindPlatformByIdController } from "./controllers/find-platform-by-id"
import { FindPlatformPaginationController } from "./controllers/find-platform-pagination"
import { UpdatePlatformController } from "./controllers/update-platform"
import { CreatePlatformRepository } from "./infra/repositories/create-platform-repository"
import { DeletePlatformRepository } from "./infra/repositories/delete-platform"
import { FindPlatformByIdRepository } from "./infra/repositories/find-platform-by-id-repository"
import { FindPlatformPaginationRepository } from "./infra/repositories/find-platform-pagination"
import { UpdatePlatformRepository } from "./infra/repositories/update-platform"


export const BuildCreatePlatformControllerFactory = () => {
    const repository = new CreatePlatformRepository()
    const usecase = new CreatePlatformUseCase(repository)
    const controller = new CreatePlatformController(usecase) 
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest)
}

export const BuildFindPlatformByIdControllerFactory = () => {
    const platformRepository = new FindPlatformByIdRepository()
    const usecase = new FindPlatformByIdUsecase(platformRepository)
    const controller = new FindPlatformByIdController(usecase)
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest)
}

export const BuildFindPlatformPaginationControllerFactory = () => {
    const platformRepository = new FindPlatformPaginationRepository()
    const usecase = new FindPlatformPaginationUsecase(platformRepository)
    const controller = new FindPlatformPaginationController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}

export const BuildUpdatePlatformControllerFactory = () => {
    const platformRepositoryFindById = new FindPlatformByIdRepository()
    const platformRepository = new UpdatePlatformRepository()
    const usecase = new UpdatePlatformUseCase(platformRepository, platformRepositoryFindById) 
    const controller = new UpdatePlatformController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}

export const BuildDeletePlatformControllerFactory = () =>{
    const platformRepository = new DeletePlatformRepository()
    const usecase = new DeletePlatformUsecase(platformRepository)
    const controller = new DeletePlatformByIdController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}