import { DeletePlatformUsecase } from "../application/usecases/delete-platform";
import { DeletePlatformRepositoryProtocolInterface } from "../domain/repositories/delete-platform";


describe('DeletePlatformUsecase', () => {
    let deletePlatformUsecase: DeletePlatformUsecase;
    let deletePlatformRepository: DeletePlatformRepositoryProtocolInterface;

    beforeEach(() => {
        deletePlatformRepository = {
            execute: jest.fn(),
        };
        deletePlatformUsecase = new DeletePlatformUsecase(deletePlatformRepository);
    });

    it('deve deletar uma plataforma com sucesso', async () => {
        const platformId = 1;

        (deletePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        await deletePlatformUsecase.execute({ platformId });

        expect(deletePlatformRepository.execute).toHaveBeenCalledWith({ platformId });
        expect(deletePlatformRepository.execute).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o repositório com o platformId correto', async () => {
        const platformId = 42;

        (deletePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        await deletePlatformUsecase.execute({ platformId });

        expect(deletePlatformRepository.execute).toHaveBeenCalledWith({ platformId: 42 });
    });

    it('deve propagar erro do repositório', async () => {
        const platformId = 1;
        const error = new Error('Erro ao deletar plataforma');

        (deletePlatformRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(deletePlatformUsecase.execute({ platformId })).rejects.toThrow('Erro ao deletar plataforma');
    });

    it('deve deletar múltiplas plataformas em sequência', async () => {
        const platformIds = [1, 2, 3];

        (deletePlatformRepository.execute as jest.Mock).mockResolvedValue(undefined);

        for (const platformId of platformIds) {
            await deletePlatformUsecase.execute({ platformId });
        }

        expect(deletePlatformRepository.execute).toHaveBeenCalledTimes(3);
        expect(deletePlatformRepository.execute).toHaveBeenNthCalledWith(1, { platformId: 1 });
        expect(deletePlatformRepository.execute).toHaveBeenNthCalledWith(2, { platformId: 2 });
        expect(deletePlatformRepository.execute).toHaveBeenNthCalledWith(3, { platformId: 3 });
    });

    it('deve retornar resultado do repositório', async () => {
        const platformId = 5;
        const mockResult = { success: true };

        (deletePlatformRepository.execute as jest.Mock).mockResolvedValue(mockResult);

        const result = await deletePlatformUsecase.execute({ platformId });

        expect(result).toEqual(mockResult);
    });
});
