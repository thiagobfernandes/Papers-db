import { FindPapersPaginationRepositoryProtocolInterface } from '../domain/repositories/find-papers-pagination';
import { Papers } from '../domain/entities/papers';
import { FindPaperPaginationUsecase } from '../application/usecases/find-papers-pagination';

describe('FindPaperPaginationUsecase', () => {
    let findPaperPaginationUsecase: FindPaperPaginationUsecase;
    let findPapersPaginationRepository: FindPapersPaginationRepositoryProtocolInterface;

    beforeEach(() => {
        findPapersPaginationRepository = {
            execute: jest.fn(),
        };
        findPaperPaginationUsecase = new FindPaperPaginationUsecase(
            findPapersPaginationRepository
        );
    });

    it('deve retornar papers paginados com sucesso', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const mockPapers = [
            new Papers({
                id: 1,
                title: 'Paper Um',
                language: 'Português',
                platformId: 1,
                userId: 1,
            }),
            new Papers({
                id: 2,
                title: 'Paper Dois',
                language: 'Inglês',
                platformId: 2,
                userId: 1,
            }),
        ];

        const mockResult = {
            papers: mockPapers,
            total: 2,
            page: 1,
            pageSize: 10,
        };

        (findPapersPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPaperPaginationUsecase.execute(params);

        expect(result).toEqual(mockResult);
        expect(result.papers).toHaveLength(2);
        expect(result.total).toBe(2);
        expect(result.page).toBe(1);
        expect(result.pageSize).toBe(10);
        expect(findPapersPaginationRepository.execute).toHaveBeenCalledWith(params);
    });

    it('deve retornar lista vazia quando não há papers', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const mockResult = {
            papers: [],
            total: 0,
            page: 1,
            pageSize: 10,
        };

        (findPapersPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPaperPaginationUsecase.execute(params);

        expect(result.papers).toHaveLength(0);
        expect(result.total).toBe(0);
    });

    it('deve paginar corretamente com diferentes limites', async () => {
        const params = {
            page: 2,
            pageSize: 5,
        };

        const mockPapers = Array.from({ length: 5 }, (_, i) => 
            new Papers({
                id: i + 6,
                title: `Paper ${i + 6}`,
                language: 'Português',
                platformId: 1,
                userId: 1,
            })
        );

        const mockResult = {
            papers: mockPapers,
            total: 15,
            page: 2,
            pageSize: 5,
        };

        (findPapersPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPaperPaginationUsecase.execute(params);

        expect(result.papers).toHaveLength(5);
        expect(result.page).toBe(2);
        expect(result.pageSize).toBe(5);
        expect(result.total).toBe(15);
    });

    it('deve filtrar papers por userId quando fornecido', async () => {
        const params = {
            page: 1,
            pageSize: 10,
            filter: { userId: 5 },
        };

        const mockPapers = [
            new Papers({
                id: 1,
                title: 'Paper do Usuário',
                language: 'Português',
                platformId: 1,
                userId: 5,
            }),
        ];

        const mockResult = {
            papers: mockPapers,
            total: 1,
            page: 1,
            pageSize: 10,
        };

        (findPapersPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPaperPaginationUsecase.execute(params);

        expect(result.papers).toHaveLength(1);
        expect(result.papers[0].userId).toBe(5);
        expect(findPapersPaginationRepository.execute).toHaveBeenCalledWith(params);
    });

    it('deve filtrar papers por platformId quando fornecido', async () => {
        const params = {
            page: 1,
            pageSize: 10,
            filter: { platformId: 3 },
        };

        const mockPapers = [
            new Papers({
                id: 1,
                title: 'Paper da Plataforma',
                language: 'Inglês',
                platformId: 3,
                userId: 1,
            }),
        ];

        const mockResult = {
            papers: mockPapers,
            total: 1,
            page: 1,
            pageSize: 10,
        };

        (findPapersPaginationRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await findPaperPaginationUsecase.execute(params);

        expect(result.papers).toHaveLength(1);
        expect(result.papers[0].platformId).toBe(3);
    });

    it('deve propagar erro do repositório', async () => {
        const params = {
            page: 1,
            pageSize: 10,
        };

        const error = new Error('Erro ao buscar papers');

        (findPapersPaginationRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(findPaperPaginationUsecase.execute(params)).rejects.toThrow('Erro ao buscar papers');
    });
});
