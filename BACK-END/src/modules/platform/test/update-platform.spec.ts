import { UpdatePlatformUseCase } from "../application/usecases/update-platform";
import { Platform } from "../domain/entities/platform";
import { FindOnePlatformByIdRepositoryProtocolInterface } from "../domain/repositories/find-one-by-id";
import { UpdatePlatformRepositoryProtocolInterface } from "../domain/repositories/update-platform";

describe('UpdatePlatformUseCase', () => {
    let updatePlatformUseCase: UpdatePlatformUseCase;
    let updatePlatformRepository: UpdatePlatformRepositoryProtocolInterface;
    let findPlatformByIdRepository: FindOnePlatformByIdRepositoryProtocolInterface;

    beforeEach(() => {
        updatePlatformRepository = {
            execute: jest.fn(),
        };
        findPlatformByIdRepository = {
            execute: jest.fn(),
        };
        updatePlatformUseCase = new UpdatePlatformUseCase(
            updatePlatformRepository,
            findPlatformByIdRepository
        );
    });

    it('deve atualizar uma plataforma com sucesso', async () => {
        const params = {
            name: 'Plataforma Atualizada',
        };
        const platformId = 1;

        const updatedPlatform = new Platform({
            id: platformId,
            name: 'Plataforma Atualizada',
        });

        (updatePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(updatedPlatform);

        const result = await updatePlatformUseCase.execute(params, platformId);

        expect(result).toEqual(updatedPlatform);
        expect(updatePlatformRepository.execute).toHaveBeenCalledWith(
            expect.any(Platform),
            platformId
        );
        expect(findPlatformByIdRepository.execute).toHaveBeenCalledWith({ id: platformId });
    });

    it('deve lançar erro se a plataforma não for encontrada após atualização', async () => {
        const params = {
            name: 'Plataforma Atualizada',
        };
        const platformId = 999;

        (updatePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await expect(updatePlatformUseCase.execute(params, platformId)).rejects.toMatchObject({
            statusCode: 404,
            message: 'Platform not found',
        });
    });

    it('deve validar o nome ao atualizar', async () => {
        const params = {
            name: 'AB',
        };
        const platformId = 1;

        await expect(updatePlatformUseCase.execute(params, platformId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper deve ter no mínimo 3 caracteres',
        });
    });

    it('deve lançar erro se o nome estiver vazio', async () => {
        const params = {
            name: '',
        };
        const platformId = 1;

        await expect(updatePlatformUseCase.execute(params, platformId)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve lançar erro se o nome for muito longo', async () => {
        const params = {
            name: 'A'.repeat(256),
        };
        const platformId = 1;

        await expect(updatePlatformUseCase.execute(params, platformId)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Título do paper deve ter no máximo 255 caracteres',
        });
    });

  

    it('deve atualizar plataforma com nome válido', async () => {
        const params = {
            name: 'Nova Plataforma Atualizada',
        };
        const platformId = 5;

        const updatedPlatform = new Platform({
            id: platformId,
            name: 'Nova Plataforma Atualizada',
        });

        (updatePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);
        (findPlatformByIdRepository.execute as jest.Mock).mockResolvedValue(updatedPlatform);

        const result = await updatePlatformUseCase.execute(params, platformId);

        expect(result.name).toBe('Nova Plataforma Atualizada');
        expect(result.id).toBe(5);
    });
});
