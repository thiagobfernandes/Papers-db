import { CreatePlatformUseCase } from "../application/usecases/create-platform";
import { Platform } from "../domain/entities/platform";
import { CreatePlatformRepositoryProtocolInterface } from "../domain/repositories/create-platform";


describe('CreatePlatformUseCase', () => {
    let createPlatformUseCase: CreatePlatformUseCase;
    let createPlatformRepository: CreatePlatformRepositoryProtocolInterface;

    beforeEach(() => {
        createPlatformRepository = {
            execute: jest.fn(),
        };
        createPlatformUseCase = new CreatePlatformUseCase(createPlatformRepository);
    });

    it('deve criar uma plataforma com sucesso', async () => {
        const params = {
            name: 'Plataforma Teste',
        };

        (createPlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        const result = await createPlatformUseCase.execute(params);

        expect(result).toBeInstanceOf(Platform);
        expect(result.name).toBe('Plataforma Teste');
        expect(createPlatformRepository.execute).toHaveBeenCalledWith(expect.any(Platform));
    });

    it('deve criar plataforma com nome válido', async () => {
        const params = {
            name: 'Nova Plataforma',
        };

        (createPlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        const result = await createPlatformUseCase.execute(params);

        expect(result.name).toBe('Nova Plataforma');
        expect(createPlatformRepository.execute).toHaveBeenCalledTimes(1);
    });

    it('deve lançar erro se o nome estiver vazio', async () => {
        const params = {
            name: '',
        };

        await expect(createPlatformUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve lançar erro se o nome for muito curto', async () => {
        const params = {
            name: 'AB',
        };

        await expect(createPlatformUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve lançar erro se o nome for muito longo', async () => {
        const params = {
            name: 'A'.repeat(256),
        };

        await expect(createPlatformUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve criar múltiplas plataformas', async () => {
        const platforms = [
            { name: 'Plataforma Um' },
            { name: 'Plataforma Dois' },
            { name: 'Plataforma Três' },
        ];

        (createPlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        for (const platform of platforms) {
            const result = await createPlatformUseCase.execute(platform);
            expect(result.name).toBe(platform.name);
        }

        expect(createPlatformRepository.execute).toHaveBeenCalledTimes(3);
    });
});
