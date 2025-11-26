import { FindPlatformByIdUsecase } from "../application/usecases/find-platform-by-id";
import { Platform } from "../domain/entities/platform";
import { FindOnePlatformByIdRepositoryProtocolInterface } from "../domain/repositories/find-one-by-id";


describe('FindPlatformByIdUsecase', () => {
    let findPlatformByIdUsecase: FindPlatformByIdUsecase;
    let findPlatformByIdRepository: FindOnePlatformByIdRepositoryProtocolInterface;

    beforeEach(() => {
        findPlatformByIdRepository = {
            execute: jest.fn(),
        };
        findPlatformByIdUsecase = new FindPlatformByIdUsecase(findPlatformByIdRepository);
    });

    it('deve encontrar uma plataforma por id com sucesso', async () => {
        const platformId = 1;
        const mockPlatform = new Platform({
            id: platformId,
            name: 'Plataforma Teste',
        });

        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(mockPlatform);

        const result = await findPlatformByIdUsecase.execute({ id: platformId });

        expect(result).toEqual(mockPlatform);
        expect(findPlatformByIdRepository.execute).toHaveBeenCalledWith({ id: platformId });
    });

    it('deve retornar null se a plataforma não for encontrada', async () => {
        const platformId = 999;

        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        const result = await findPlatformByIdUsecase.execute({ id: platformId });

        expect(result).toBeNull();
        expect(findPlatformByIdRepository.execute).toHaveBeenCalledWith({ id: platformId });
    });

    it('deve chamar o repositório com o id correto', async () => {
        const platformId = 42;

        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await findPlatformByIdUsecase.execute({ id: platformId });

        expect(findPlatformByIdRepository.execute).toHaveBeenCalledTimes(1);
        expect(findPlatformByIdRepository.execute).toHaveBeenCalledWith({ id: 42 });
    });

    it('deve encontrar plataforma com nome específico', async () => {
        const platformId = 5;
        const mockPlatform = new Platform({
            id: platformId,
            name: 'Plataforma Específica',
        });

        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(mockPlatform);

        const result = await findPlatformByIdUsecase.execute({ id: platformId });

        expect(result?.name).toBe('Plataforma Específica');
        expect(result?.id).toBe(5);
    });

    it('deve propagar erro do repositório', async () => {
        const platformId = 1;
        const error = new Error('Erro ao buscar plataforma');

        (findPlatformByIdRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(findPlatformByIdUsecase.execute({ id: platformId })).rejects.toThrow('Erro ao buscar plataforma');
    });
});
