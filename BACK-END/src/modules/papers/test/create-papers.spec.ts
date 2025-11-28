import { CreatePapersRepositoryProtocolInterface } from '../domain/repositories/create-papers';
import { Papers } from '../domain/entities/papers';
import { CreatePapersUseCase } from '../application/usecases/create-papers';
import { PublisherService } from '../../../shared/queue/queue';
import { FindAllUserRepository } from '../../users/infra/repositories/find-all';

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

jest.mock('../../../shared/schemas/app-config-env', () => ({
    AppConfigSchema: {
        loadConfig: jest.fn().mockReturnValue({
            PORT: 3000,
            DATABASE_PORT: 5432,
            DATABASE_USER: 'test',
            DATABASE_PASSWORD: 'test',
            JWT_SECRET: 'test-secret',
            DATABASE_DB: 'test_db',
            HOST: 'localhost',
            REDIS_HOST: 'localhost',
            BACKEND_URL: 'http://localhost:3000',
            REDIS_PASSWORD: 'test',
        }),
    },
}));

// Mock do PublisherService
jest.mock('../../../shared/queue/queue', () => ({
    PublisherService: jest.fn().mockImplementation(() => ({
        publish: jest.fn().mockResolvedValue(undefined),
    })),
}));

// Mock do FindAllUserRepository
jest.mock('../../users/infra/repositories/find-all', () => ({
    FindAllUserRepository: jest.fn().mockImplementation(() => ({
        execute: jest.fn().mockResolvedValue([]),
    })),
}));

describe('CreatePapersUseCase', () => {
    let createPapersUseCase: CreatePapersUseCase;
    let createPapersRepository: CreatePapersRepositoryProtocolInterface;
    let publisherService: PublisherService;
    let findAllUser: FindAllUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        
        createPapersRepository = {
            execute: jest.fn().mockResolvedValue(undefined),
        };
        
        publisherService = new PublisherService();
        findAllUser = new FindAllUserRepository();
        
        createPapersUseCase = new CreatePapersUseCase(
            createPapersRepository,
            publisherService,
            findAllUser
        );
    });

    it('deve criar um paper com sucesso', async () => {
        const params = {
            title: 'Título do Paper',
            language: 'Português',
            platformId: 1,
            documentPath: "THIAGOLIndo.pdf"
        };
        const userId = 1;

        const result = await createPapersUseCase.execute(params, userId);

        expect(result).toBeInstanceOf(Papers);
        expect(result.title).toBe('Título do Paper');
        expect(result.language).toBe('Português');
        expect(result.platformId).toBe(1);
        expect(createPapersRepository.execute).toHaveBeenCalledWith(
            expect.any(Papers),
            userId
        );
    });

    it('deve criar um paper com documentPath opcional', async () => {
        const params = {
            title: 'Paper com Documento',
            language: 'Inglês',
            platformId: 2,
            documentPath: '/path/to/document.pdf',
        };
        const userId = 2;

        const result = await createPapersUseCase.execute(params, userId);

        expect(result).toBeInstanceOf(Papers);
        expect(result.documentPath).toBe('/path/to/document.pdf');
        expect(createPapersRepository.execute).toHaveBeenCalledWith(
            expect.any(Papers),
            userId
        );
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