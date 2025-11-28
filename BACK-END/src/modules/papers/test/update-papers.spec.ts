import { UpdatePapersRepositoryProtocolInterface } from '../domain/repositories/update-papers';
import { FindPapersByIdRepositoryProtocolInterface } from '../domain/repositories/find-one-by-id';
import { Papers } from '../domain/entities/papers';
import { UpdatePapersUseCase } from '../application/usecases/update-papers';

// Mock dos módulos que causam problemas
jest.mock('../../../shared/helpers/logger', () => ({
    Logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

jest.mock('../../../shared/http/protocols', () => ({
    ok: jest.fn(),
    badRequest: jest.fn(),
    serverError: jest.fn(),
    notFound: jest.fn(),
}));

describe('UpdatePapersUseCase', () => {
    let updatePapersUseCase: UpdatePapersUseCase;
    let updatePapersRepository: UpdatePapersRepositoryProtocolInterface;
    let findPapersByIdRepository: FindPapersByIdRepositoryProtocolInterface;

    beforeEach(() => {
        updatePapersRepository = {
            execute: jest.fn(),
        };
        findPapersByIdRepository = {
            execute: jest.fn(),
        };
        updatePapersUseCase = new UpdatePapersUseCase(
            updatePapersRepository,
            findPapersByIdRepository
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve atualizar um paper com sucesso', async () => {
        const params = {
            title: 'Título Atualizado',
            language: 'Inglês',
            platformId: 1,
        };
        const paperId = 1;
        const userId = 1;

        const updatedPaper = new Papers({
            id: paperId,
            title: 'Título Atualizado',
            language: 'Inglês',
            platformId: 1,
            userId: userId,
        });

        (updatePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(updatedPaper);

        const result = await updatePapersUseCase.execute(params, paperId, userId);

        expect(result).toEqual(updatedPaper);
        expect(updatePapersRepository.execute).toHaveBeenCalledWith(
            expect.any(Papers),
            paperId,
            userId
        );
        expect(findPapersByIdRepository.execute).toHaveBeenCalledWith({ id: paperId });
    });

    it('deve lançar erro se o paper não for encontrado após atualização', async () => {
        const params = {
            title: 'Título Atualizado',
            language: 'Português',
            platformId: 1,
        };
        const paperId = 999;
        const userId = 1;

        (updatePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await expect(updatePapersUseCase.execute(params, paperId, userId)).rejects.toMatchObject({
            statusCode: 404,
            message: 'Papers not found',
        });
    });

    it('deve validar o título ao atualizar', async () => {
        const params = {
            title: 'AB',
            language: 'Português',
            platformId: 1,
        };
        const paperId = 1;
        const userId = 1;

        await expect(updatePapersUseCase.execute(params, paperId, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper deve ter no mínimo 3 caracteres',
        });
    });

    it('deve validar a linguagem ao atualizar', async () => {
        const params = {
            title: 'Título Válido',
            language: '',
            platformId: 1,
        };
        const paperId = 1;
        const userId = 1;

        await expect(updatePapersUseCase.execute(params, paperId, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Linguagem do paper não pode ser vazia',
        });
    });

    it('deve validar o platformId ao atualizar', async () => {
        const params = {
            title: 'Título Válido',
            language: 'Português',
            platformId: -1,
        };
        const paperId = 1;
        const userId = 1;

        await expect(updatePapersUseCase.execute(params, paperId, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'ID da plataforma deve ser um número inteiro positivo',
        });
    });

    it('deve atualizar paper com documentPath', async () => {
        const params = {
            title: 'Paper com Documento Atualizado',
            language: 'Espanhol',
            platformId: 2,
            documentPath: '/path/to/updated-document.pdf',
        };
        const paperId = 1;
        const userId = 1;

        const updatedPaper = new Papers({
            id: paperId,
            title: 'Paper com Documento Atualizado',
            language: 'Espanhol',
            platformId: 2,
            userId: userId,
            documentPath: '/path/to/updated-document.pdf',
        });

        (updatePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPapersByIdRepository.execute as jest.Mock).mockResolvedValue(updatedPaper);

        const result = await updatePapersUseCase.execute(params, paperId, userId);

        expect(result.documentPath).toBe('/path/to/updated-document.pdf');
    });
});