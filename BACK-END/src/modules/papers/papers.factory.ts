import { Controller } from "../../shared/http/protocols"
import { PublisherService } from "../../shared/queue/queue"
import { FindPlatformByIdRepository } from "../platform/infra/repositories/find-platform-by-id-repository"
import { FindAllUserRepository } from "../users/infra/repositories/find-all"
import { CreatePapersUseCase } from "./application/usecases/create-papers"
import { DeletePapersUsecase } from "./application/usecases/delete-papers"
import { FindPapersByIdUsecase } from "./application/usecases/find-papers-by-id"
import { FindPaperPaginationUsecase } from "./application/usecases/find-papers-pagination"
import { UpdatePapersUseCase } from "./application/usecases/update-papers"
import { CreatePapersController } from "./controllers/create-papers"
import { DeletePapersByIdController } from "./controllers/delete-papers"
import { FindPapersByIdController } from "./controllers/find-papers-by-id"
import { FindPapersPaginationController } from "./controllers/find-papers-pagination"
import { UpdatePapersController } from "./controllers/update-papers"
import { CreatePapersRepository } from "./infra/repositories/create-paper-repository"
import { DeletePapersRepository } from "./infra/repositories/delete-papers"
import { FindPaperByIdRepository } from "./infra/repositories/find-paper-by-id-repository"
import { FindPapersPaginationRepository } from "./infra/repositories/find-papers-pagination"
import { UpdatePapersRepository } from "./infra/repositories/update-papers"


export const BuildCreatePapersControllerFactory = () => {
    const findAllUserRepository = new FindAllUserRepository()
    const publisherService = new PublisherService()
    const repository = new CreatePapersRepository()
    const usecase = new CreatePapersUseCase(repository, publisherService, findAllUserRepository)
    const controller = new CreatePapersController(usecase)
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest)
}

export const BuildFindPapersByIdControllerFactory = () => {
    const papersRepository = new FindPaperByIdRepository()
    const usecase = new FindPapersByIdUsecase(papersRepository)
    const controller = new FindPapersByIdController(usecase)
    return async (httpRequest: Controller.Params) => await controller.handle(httpRequest)
}

export const BuildFindPaginationControllerFactory = () => {
    const papersRepository = new FindPapersPaginationRepository()
    const usecase = new FindPaperPaginationUsecase(papersRepository)
    const controller = new FindPapersPaginationController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}

export const BuildUpdatePaginationControllerFactory = () => {
    const paperRepositoryFindByIdMethod = new FindPaperByIdRepository()
    const platformRepositoryFindById = new FindPlatformByIdRepository()
    const papersRepository = new UpdatePapersRepository(paperRepositoryFindByIdMethod)
    const usecase = new UpdatePapersUseCase(papersRepository, paperRepositoryFindByIdMethod)
    const controller = new UpdatePapersController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}

export const BuildDeletePapersControllerFactory = () => {
    const papersRepositoryFindByIdMethod = new FindPaperByIdRepository()
    const papersRepository = new DeletePapersRepository(papersRepositoryFindByIdMethod)
    const usecase = new DeletePapersUsecase(papersRepository)
    const controller = new DeletePapersByIdController(usecase)
    return async (http: Controller.Params) => await controller.handle(http)
}