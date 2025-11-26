
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from '../application/usecases/create-user';
import { CreateUserRepositoryProtocolInterface } from '../domain/repositories/create-user';
import { FindUserByCpfRepositoryProtocolInterface } from '../domain/repositories/find-user-by-cpf';
import { FindUserByEmailRepositoryProtocolInterface } from '../domain/repositories/find-user-by-email';
import { User } from '../domain/entities/user';

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let createUserRepository: CreateUserRepositoryProtocolInterface;
    let findUserByCpfRepository: FindUserByCpfRepositoryProtocolInterface;
    let findUserByEmailRepository: FindUserByEmailRepositoryProtocolInterface;

    beforeEach(() => {
        createUserRepository = {
            execute: jest.fn(),
        };
        findUserByCpfRepository = {
            execute: jest.fn(),
        };
        findUserByEmailRepository = {
            execute: jest.fn(),
        };
        createUserUseCase = new CreateUserUseCase(
            createUserRepository,
            findUserByCpfRepository,
            findUserByEmailRepository
        );

        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    });

    it('deve criar um usuário com sucesso', async () => {
        const params = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        const createdUser = {
            id: 1,
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'hashedPassword',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
            created_at: new Date(),
        };

        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(null);
        (findUserByEmailRepository.execute as jest.Mock).mockResolvedValue(null);
        (createUserRepository.execute as jest.Mock).mockResolvedValue(createdUser);

        const result = await createUserUseCase.execute(params);

        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('João Silva');
        expect(result.email).toBe('joao@example.com');
        expect(result.cpf).toBe('12345678901');
        expect(createUserRepository.execute).toHaveBeenCalled();
    });

    it('deve lançar erro se o CPF já estiver cadastrado', async () => {
        const params = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        const existingUser = {
            id: 1,
            cpf: '12345678901',
        };

        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(existingUser);

        await expect(createUserUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
            message: 'CPF já cadastrado',
        });
    });

    it('deve lançar erro se o email já estiver cadastrado', async () => {
        const params = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        const existingUser = {
            id: 1,
            email: 'joao@example.com',
        };

        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(null);
        (findUserByEmailRepository.execute as jest.Mock).mockResolvedValue(existingUser);

        await expect(createUserUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
            message: 'Email já cadastrado',
        });
    });

    it('deve hashear a senha antes de salvar', async () => {
        const params = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        const createdUser = {
            id: 1,
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'hashedPassword',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
            created_at: new Date(),
        };

        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(null);
        (findUserByEmailRepository.execute as jest.Mock).mockResolvedValue(null);
        (createUserRepository.execute as jest.Mock).mockResolvedValue(createdUser);

        await createUserUseCase.execute(params);

        expect(bcrypt.genSalt).toHaveBeenCalledWith(8);
        expect(bcrypt.hash).toHaveBeenCalledWith('Senha@123', 'salt');
    });

    it('deve criar usuário com campos opcionais', async () => {
        const params = {
            name: 'Maria Santos',
            username: 'mariasantos',
            email: 'maria@example.com',
            password: 'Senha@456',
            cpf: '98765432109',
            primaryPhone: '11987654321',
            secondaryPhone: '11912345678',
            dateOfBirth: new Date('1995-05-15'),
            genre: 'Feminino',
        };

        const createdUser = {
            id: 2,
            name: 'Maria Santos',
            username: 'mariasantos',
            email: 'maria@example.com',
            password: 'hashedPassword',
            cpf: '98765432109',
            primaryPhone: '11987654321',
            secondaryPhone: '11912345678',
            dateOfBirth: new Date('1995-05-15'),
            genre: 'Feminino',
            created_at: new Date(),
        };

        (findUserByCpfRepository.execute as jest.Mock).mockResolvedValue(null);
        (findUserByEmailRepository.execute as jest.Mock).mockResolvedValue(null);
        (createUserRepository.execute as jest.Mock).mockResolvedValue(createdUser);

        const result = await createUserUseCase.execute(params);

        expect(result.username).toBe('mariasantos');
        expect(result.primaryPhone).toBe('11987654321');
        expect(result.secondaryPhone).toBe('11912345678');
    });

    it('deve validar o nome do usuário', async () => {
        const params = {
            name: 'Jo',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        await expect(createUserUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve validar o email do usuário', async () => {
        const params = {
            name: 'João Silva',
            email: 'email-invalido',
            password: 'Senha@123',
            cpf: '12345678901',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        await expect(createUserUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });

    it('deve validar o CPF do usuário', async () => {
        const params = {
            name: 'João Silva',
            email: 'joao@example.com',
            password: 'Senha@123',
            cpf: '123',
            dateOfBirth: new Date('1990-01-01'),
            genre: 'Masculino',
        };

        await expect(createUserUseCase.execute(params)).rejects.toMatchObject({
            statusCode: 400,
        });
    });
});
