import { CacheServiceInterface } from "../../../shared/cache/cache";
import { jwtToken } from "../../../shared/jwt/jwt-token";
import { UpdateUserUseCase } from "../application/usecases/update-user";
import { User } from "../domain/entities/user";
import { FindUserByCpfRepositoryProtocolInterface } from "../domain/repositories/find-user-by-cpf";
import { FindUserByIdRepositoryProtocolInterface } from "../domain/repositories/find-user-by-id";
import { UpdateUserRepositoryProtocolInterface } from "../domain/repositories/update-user";


jest.mock('../../../shared/jwt/jwt-token');

describe('UpdateUserUseCase', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let findUserByIdRepository: FindUserByIdRepositoryProtocolInterface;
    let findUserByCpfRepository: FindUserByCpfRepositoryProtocolInterface;
    let updateUserRepository: UpdateUserRepositoryProtocolInterface;
    let jwtService: jwtToken;
    let cacheService: CacheServiceInterface;

    beforeEach(() => {
        findUserByIdRepository = {
            execute: jest.fn(),
        };
        findUserByCpfRepository = {
            execute: jest.fn(),
        };
        updateUserRepository = {
            execute: jest.fn(),
        };
        jwtService = {
            generateTokenJwt: jest.fn().mockReturnValue('fake-token'),
        } as any;
        cacheService = {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            delMultiple: jest.fn(),
        };
        updateUserUseCase = new UpdateUserUseCase(
            findUserByIdRepository,
            findUserByCpfRepository,
            updateUserRepository,
            jwtService,
            cacheService
        );
    });

    it('should update a user without a password', async () => {
        const user = new User({
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        const updatedUser = {
            id: 1,
            name: 'Updated User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (updateUserRepository.execute as jest.Mock).mockResolvedValue(updatedUser);

        const result = await updateUserUseCase.execute({ name: 'Updated User' }, 1);

        expect(result.name).toBe('Updated User');
        expect(result.accessToken).toBe('fake-token');
        expect(updateUserRepository.execute).toHaveBeenCalled();
        expect(cacheService.del).toHaveBeenCalledWith('user:profile:1');
    });

    it('should throw an error if the user is not found', async () => {
        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(null);

        await expect(updateUserUseCase.execute({ name: 'Updated User' }, 999)).rejects.toMatchObject({
            statusCode: 404,
            message: 'Usuário não encontrado',
        });
    });

    it('should throw an error if the CPF is already in use by another user', async () => {
        const user = new User({
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        const existingUser = {
            id: 2,
            cpf: '98765432109',
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(existingUser);

        await expect(updateUserUseCase.execute({ cpf: '98765432109' }, 1)).rejects.toMatchObject({
            statusCode: 400,
            message: 'CPF já está em uso por outro usuário',
        });
    });

    it('should update the user with a new valid CPF', async () => {
        const user = new User({
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        const updatedUser = {
            id: 1,
            name: 'Test User',
            cpf: '98765432109',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(null);
        (updateUserRepository.execute as jest.Mock).mockResolvedValue(updatedUser);

        const result = await updateUserUseCase.execute({ cpf: '98765432109' }, 1);

        expect(result.cpf).toBe('98765432109');
    });

    it('should update user with isAdmin', async () => {
        const user = new User({
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
            isAdmin: false,
        });

        const updatedUser = {
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
            isAdmin: true,
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (updateUserRepository.execute as jest.Mock).mockResolvedValue(updatedUser);

        const result = await updateUserUseCase.execute({ isAdmin: true }, 1);

        expect(result.isAdmin).toBe(true);
        expect(jwtService.generateTokenJwt).toHaveBeenCalledWith({ id: 1, isAdmin: true, isMaster: true });
    });

    it('should clear the cache after an update', async () => {
        const user = new User({
            id: 5,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        const updatedUser = {
            id: 5,
            name: 'Updated User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (updateUserRepository.execute as jest.Mock).mockResolvedValue(updatedUser);

        await updateUserUseCase.execute({ name: 'Updated User' }, 5);

        expect(cacheService.del).toHaveBeenCalledWith('user:profile:5');
    });

    it('should update multiple user fields', async () => {
        const user = new User({
            id: 1,
            name: 'Test User',
            cpf: '12345678901',
            email: 'test@example.com',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        });

        const updatedUser = {
            id: 1,
            name: 'Updated User',
            username: 'updateduser',
            cpf: '12345678901',
            email: 'test@example.com',
            primaryPhone: '11987654321',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Feminino',
        };

        (findUserByIdRepository.execute as jest.Mock).mockResolvedValue(user);
        (updateUserRepository.execute as jest.Mock).mockResolvedValue(updatedUser);

        const result = await updateUserUseCase.execute(
            {
                name: 'Updated User',
                username: 'updateduser',
                primaryPhone: '11987654321',
                genre: 'Feminino',
            },
            1
        );

        expect(result.name).toBe('Updated User');
        expect(result.username).toBe('updateduser');
        expect(result.primaryPhone).toBe('11987654321');
        expect(result.genre).toBe('Feminino');
    });
});
