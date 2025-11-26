import { CacheServiceInterface } from "../../../shared/cache/cache";
import { FindUserByIdUseCase } from "../application/usecases/find-user-by-id";
import { User } from "../domain/entities/user";
import { FindUserByIdRepositoryProtocolInterface } from "../domain/repositories/find-user-by-id";

describe('FindUserByIdUseCase', () => {
    let findUserByIdUseCase: FindUserByIdUseCase;
    let findUserByIdRepository: FindUserByIdRepositoryProtocolInterface;
    let cacheService: CacheServiceInterface;

    beforeEach(() => {
        findUserByIdRepository = {
            execute: jest.fn(),
        };
        cacheService = {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            delMultiple: jest.fn(),
        };
        findUserByIdUseCase = new FindUserByIdUseCase(
            findUserByIdRepository,
            cacheService
        );
    });

    it('deve encontrar um usuário por id com sucesso', async () => {
        const userId = 1;
        const mockUser = new User({
            id: userId,
            name: 'João Silva',
            email: 'joao@example.com',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(mockUser);

        const result = await findUserByIdUseCase.execute({ id: userId });

        expect(result).toEqual(mockUser);
        expect(findUserByIdRepository.execute).toHaveBeenCalledWith({ id: userId });
        expect(cacheService.set).toHaveBeenCalledWith('user:profile:1', mockUser, 60);
    });

    it('deve retornar usuário do cache quando disponível', async () => {
        const userId = 1;
        const cachedUser = new User({
            id: userId,
            name: 'João Silva',
            email: 'joao@example.com',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        (cacheService.get as jest.Mock).mockResolvedValue(cachedUser);

        const result = await findUserByIdUseCase.execute({ id: userId });

        expect(result).toEqual(cachedUser);
        expect(cacheService.get).toHaveBeenCalledWith('user:profile:1');
        expect(findUserByIdRepository.execute).not.toHaveBeenCalled();
        expect(cacheService.set).not.toHaveBeenCalled();
    });

    it('deve lançar erro se o usuário não for encontrado', async () => {
        const userId = 999;

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await expect(findUserByIdUseCase.execute({ id: userId })).rejects.toMatchObject({
            statusCode: 404,
            message: 'Usuário não encontrado',
        });
    });

    it('deve armazenar usuário no cache após buscar do repositório', async () => {
        const userId = 5;
        const mockUser = new User({
            id: userId,
            name: 'Maria Santos',
            email: 'maria@example.com',
            cpf: '98765432109',
            dateOfBirth: new Date('1995-05-15'),
            genre: 'Feminino',
        });

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(mockUser);

        await findUserByIdUseCase.execute({ id: userId });

        expect(cacheService.set).toHaveBeenCalledWith('user:profile:5', mockUser, 60);
    });

    it('deve usar a chave de cache correta', async () => {
        const userId = 42;

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        try {
            await findUserByIdUseCase.execute({ id: userId });
        } catch (error) {
            // Esperado lançar erro
        }

        expect(cacheService.get).toHaveBeenCalledWith('user:profile:42');
    });

    it('deve encontrar usuário com todos os campos preenchidos', async () => {
        const userId = 1;
        const mockUser = new User({
            id: userId,
            name: 'João Silva',
            username: 'joaosilva',
            email: 'joao@example.com',
            cpf: '12345678901',
            primaryPhone: '11987654321',
            secondaryPhone: '11912345678',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
            isAdmin: true,
            isMaster: false,
        });

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(mockUser);

        const result = await findUserByIdUseCase.execute({ id: userId });

        expect(result?.username).toBe('joaosilva');
        expect(result?.primaryPhone).toBe('11987654321');
        expect(result?.isAdmin).toBe(true);
    });

    it('deve propagar erro do repositório', async () => {
        const userId = 1;
        const error = new Error('Erro ao buscar usuário');

        (cacheService.get as jest.Mock).mockResolvedValue(null);
        (findUserByIdRepository.execute as jest.Mock).mockRejectedValue(error);

        await expect(findUserByIdUseCase.execute({ id: userId })).rejects.toThrow('Erro ao buscar usuário');
    });
});
