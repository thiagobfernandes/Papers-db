import { FindPlatformPaginationUsecase } from "../application/usecases/find-platform-pagination";
import { Platform } from "../domain/entities/platform";
import { FindPlatformPaginationRepositoryProtocolInterface } from "../domain/repositories/find-platform-pagination";

describe('FindPlatformPaginationUsecase', () => {
    let findPlatformPaginationUsecase: FindPlatformPaginationUsecase;
    let findPlatformPaginationRepository: FindPlatformPaginationRepositoryProtocolInterface;

    beforeEach(() => {
        findPlatformPaginationRepository = {
            execute: jest.fn(),
        };
        findPlatformPaginationUsecase = new FindPlatformPaginationUsecase(
            findPlatformPaginationRepository
        );
    });

    it('deve retornar plataformas paginadas com sucesso', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const mockPlatforms = [
            new Platform({
                id: 1,
                name: 'Plataforma Um',
            }),
            new Platform({
                id: 2,
                name: 'Plataforma Dois',
            }),
        ];

        const mockResult = {
            platforms: mockPlatforms,
            total: 2,
            page: 1,
            pageSize: 10,
        };

        (findPlatformPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPlatformPaginationUsecase.execute(params);

        expect(result).toEqual(mockResult);
        expect(result.platforms).toHaveLength(2);
        expect(result.total).toBe(2);
        expect(result.page).toBe(1);
        expect(result.pageSize).toBe(10);
        expect(findPlatformPaginationRepository.execute).toHaveBeenCalledWith(params);
    });

    it('deve retornar lista vazia quando não há plataformas', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const mockResult = {
            platforms: [],
            total: 0,
            page: 1,
            pageSize: 10,
        };

        (findPlatformPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPlatformPaginationUsecase.execute(params);

        expect(result.platforms).toHaveLength(0);
        expect(result.total).toBe(0);
    });

    it('deve paginar corretamente com diferentes limites', async () => {
        const params = {
            page: 2,
            pageSize: 5,
        };

        const mockPlatforms = Array.from({ length: 5 }, (_, i) => 
            new Platform({
                id: i + 6,
                name: `Plataforma ${i + 6}`,
            })
        );

        const mockResult = {
            platforms: mockPlatforms,
            total: 15,
            page: 2,
            pageSize: 5,
        };

        (findPlatformPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPlatformPaginationUsecase.execute(params);

        expect(result.platforms).toHaveLength(5);
        expect(result.page).toBe(2);
        expect(result.pageSize).toBe(5);
        expect(result.total).toBe(15);
    });

    it('deve retornar primeira página corretamente', async () => {
        const params = {
            page: 1,
            pageSize: 3,
        };

        const mockPlatforms = [
            new Platform({ id: 1, name: 'Plataforma A' }),
            new Platform({ id: 2, name: 'Plataforma B' }),
            new Platform({ id: 3, name: 'Plataforma C' }),
        ];

        const mockResult = {
            platforms: mockPlatforms,
            total: 10,
            page: 1,
            pageSize: 3,
        };

        (findPlatformPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPlatformPaginationUsecase.execute(params);

        expect(result.platforms).toHaveLength(3);
        expect(result.platforms[0].name).toBe('Plataforma A');
        expect(result.platforms[1].name).toBe('Plataforma B');
        expect(result.platforms[2].name).toBe('Plataforma C');
    });

    it('deve propagar erro do repositório', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const error = new Error('Erro ao buscar plataformas');

        (findPlatformPaginationRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(findPlatformPaginationUsecase.execute(params)).rejects.toThrow('Erro ao buscar plataformas');
    });

    it('deve retornar última página com menos itens', async () => {
        const params = {
            page: 3,
            pageSize: 10,
        };

        const mockPlatforms = [
            new Platform({ id: 21, name: 'Plataforma Final' }),
        ];

        const mockResult = {
            platforms: mockPlatforms,
            total: 21,
            page: 3,
            pageSize: 10,
        };

        (findPlatformPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPlatformPaginationUsecase.execute(params);

        expect(result.platforms).toHaveLength(1);
        expect(result.total).toBe(21);
    });
});
