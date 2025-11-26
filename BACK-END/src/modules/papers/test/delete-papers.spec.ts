import { DeletePapersUsecase } from '../application/usecases/delete-papers';
import { DeletePapersRepositoryProtocolInterface } from '../domain/repositories/delete-papers';

describe('DeletePapersUsecase', () => {
    let deletePapersUsecase: DeletePapersUsecase;
    let deletePapersRepository: DeletePapersRepositoryProtocolInterface;

    beforeEach(() => {
        deletePapersRepository = {
            execute: jest.fn(),
        };
        deletePapersUsecase = new DeletePapersUsecase(deletePapersRepository);
    });

    it('deve deletar um paper com sucesso', async () => {
        const papersId = 1;

        (deletePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);

        await deletePapersUsecase.execute({ papersId });

        expect(deletePapersRepository.execute).toHaveBeenCalledWith({ papersId });
        expect(deletePapersRepository.execute).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o repositório com o papersId correto', async () => {
        const papersId = 42;

        (deletePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);

        await deletePapersUsecase.execute({ papersId });

        expect(deletePapersRepository.execute).toHaveBeenCalledWith({ papersId: 42 });
    });

    it('deve propagar erro do repositório', async () => {
        const papersId = 1;
        const error = new Error('Erro ao deletar paper');

        (deletePapersRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(deletePapersUsecase.execute({ papersId })).rejects.toThrow('Erro ao deletar paper');
    });

    it('deve deletar múltiplos papers em sequência', async () => {
        const papersIds = [1, 2, 3];

        (deletePapersRepository.execute as jest.Mock).mockResolvedValue(undefined);

        for (const papersId of papersIds) {
            await deletePapersUsecase.execute({ papersId });
        }

        expect(deletePapersRepository.execute).toHaveBeenCalledTimes(3);
        expect(deletePapersRepository.execute).toHaveBeenNthCalledWith(1, { papersId: 1 });
        expect(deletePapersRepository.execute).toHaveBeenNthCalledWith(2, { papersId: 2 });
        expect(deletePapersRepository.execute).toHaveBeenNthCalledWith(3, { papersId: 3 });
    });
});
