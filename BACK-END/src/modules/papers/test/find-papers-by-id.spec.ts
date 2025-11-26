import { FindPapersByIdRepositoryProtocolInterface } from '../domain/repositories/find-one-by-id';
import { Papers } from '../domain/entities/papers';
import { FindPapersByIdUsecase } from '../application/usecases/find-papers-by-id';

describe('FindPapersByIdUsecase', () => {
    let findPapersByIdUsecase: FindPapersByIdUsecase;
    let findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface;

    beforeEach(() => {
        findPapersByIdRepository = {
            execute: jest.fn(),
        };
        findPapersByIdUsecase = new FindPapersByIdUsecase(findPapersByIdRepository);
    });

    it('deve encontrar um paper por id com sucesso', async () => {
        const paperId = 1;
        const mockPaper = new Papers({
            id: paperId,
            title: 'Título do Paper',
            language: 'Português',
            platformId: 1,
            userId: 1,
        });

        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(mockPaper);

        const result = await findPapersByIdUsecase.execute({ id: paperId });

        expect(result).toEqual(mockPaper);
        expect(findPapersByIdRepository.execute).toHaveBeenCalledWith({ id: paperId });
    });

    it('deve retornar null se o paper não for encontrado', async () => {
        const paperId = 999;

        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        const result = await findPapersByIdUsecase.execute({ id: paperId });

        expect(result).toBeNull();
        expect(findPapersByIdRepository.execute).toHaveBeenCalledWith({ id: paperId });
    });

    it('deve encontrar um paper com documentPath', async () => {
        const paperId = 1;
        const mockPaper = new Papers({
            id: paperId,
            title: 'Paper com Documento',
            language: 'Inglês',
            platformId: 2,
            userId: 1,
            documentPath: '/path/to/document.pdf',
        });

        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(mockPaper);

        const result = await findPapersByIdUsecase.execute({ id: paperId });

        expect(result).toEqual(mockPaper);
        expect(result?.documentPath).toBe('/path/to/document.pdf');
    });

    it('deve chamar o repositório com o id correto', async () => {
        const paperId = 42;

        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await findPapersByIdUsecase.execute({ id: paperId });

        expect(findPapersByIdRepository.execute).toHaveBeenCalledTimes(1);
        expect(findPapersByIdRepository.execute).toHaveBeenCalledWith({ id: 42 });
    });
});
