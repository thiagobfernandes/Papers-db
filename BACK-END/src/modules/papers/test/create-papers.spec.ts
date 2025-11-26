import { CreatePapersRepositoryProtocolInterface } from '../domain/repositories/create-papers';
import { Papers } from '../domain/entities/papers';
import { CreatePapersUseCase } from '../application/usecases/create-papers';

describe('CreatePapersUseCase', () => {
    let createPapersUseCase: CreatePapersUseCase;
    let createPapersRepository: CreatePapersRepositoryProtocolInterface;

    beforeEach(() => {
        createPapersRepository = {
            execute: jest.fn(),
        };
        createPapersUseCase = new CreatePapersUseCase(createPapersRepository);
    });

    it('deve criar um paper com sucesso', async () => {
        const params = {
            title: 'Título do Paper',
            language: 'Português',
            platformId: 1,
        };
        const userId = 1;

        (createPapersRepository.execute as jest.Mock).mockResolvedValue(undefined);

        const result = await createPapersUseCase.execute(params, userId);

        expect(result).toBeInstanceOf(Papers);
        expect(result.title).toBe('Título do Paper');
        expect(result.language).toBe('Português');
        expect(result.platformId).toBe(1);
        expect(createPapersRepository.execute).toHaveBeenCalledWith(expect.any(Papers), userId);
    });

    it('deve criar um paper com documentPath opcional', async () => {
        const params = {
            title: 'Paper com Documento',
            language: 'Inglês',
            platformId: 2,
            documentPath: '/path/to/document.pdf',
        };
        const userId = 2;

        (createPapersRepository.execute as jest.Mock).mockResolvedValue(undefined);

        const result = await createPapersUseCase.execute(params, userId);

        expect(result).toBeInstanceOf(Papers);
        expect(result.documentPath).toBe('/path/to/document.pdf');
        expect(createPapersRepository.execute).toHaveBeenCalledWith(expect.any(Papers), userId);
    });

    it('deve lançar erro se o título tiver menos de 3 caracteres', async () => {
        const params = {
            title: 'AB',
            language: 'Português',
            platformId: 1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper deve ter no mínimo 3 caracteres',
        });
    });

    it('deve lançar erro se o título tiver mais de 255 caracteres', async () => {
        const params = {
            title: 'A'.repeat(256),
            language: 'Português',
            platformId: 1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper deve ter no máximo 255 caracteres',
        });
    });

    it('deve lançar erro se o título contiver números', async () => {
        const params = {
            title: 'Título com Números 123',
            language: 'Português',
            platformId: 1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper não deve conter números',
        });
    });

    it('deve lançar erro se a linguagem estiver vazia', async () => {
        const params = {
            title: 'Título Válido',
            language: '',
            platformId: 1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Linguagem do paper não pode ser vazia',
        });
    });

    it('deve lançar erro se a linguagem tiver mais de 100 caracteres', async () => {
        const params = {
            title: 'Título Válido',
            language: 'A'.repeat(101),
            platformId: 1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Linguagem do paper deve ter no máximo 100 caracteres',
        });
    });

    it('deve lançar erro se o platformId não for um número inteiro positivo', async () => {
        const params = {
            title: 'Título Válido',
            language: 'Português',
            platformId: -1,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'ID da plataforma deve ser um número inteiro positivo',
        });
    });

    it('deve lançar erro se o platformId for zero', async () => {
        const params = {
            title: 'Título Válido',
            language: 'Português',
            platformId: 0,
        };
        const userId = 1;

        await expect(createPapersUseCase.execute(params, userId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'ID da plataforma deve ser um número inteiro positivo',
        });
    });
});
