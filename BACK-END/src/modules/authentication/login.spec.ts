import { LoginService } from './login-service';
import bcrypt from 'bcrypt';
import { User } from '../users/domain/entities/user';

jest.mock('../../shared/jwt/jwt-token', () => {
  return {
    jwtToken: jest.fn().mockImplementation(() => ({
      generateTokenJwt: jest.fn().mockReturnValue('token-fake'),
    })),
  };
});

jest.mock('../users/infra/repositories/find-user-by-email-repository', () => {
  return {
    FindUserByEmailRepository: jest.fn().mockImplementation(() => ({
      execute: jest.fn(
        ({ email }: { email: string }): Promise<User | null> => {
          if (email === 'teste@teste.com') {
            const userData = {
              id: 1,
              name: 'Test User',
              email: 'teste@teste.com',
              password: bcrypt.hashSync('senha123', 10),
              cpf: '123.456.789-00',
              dateOfBirth: new Date('1990-01-01'),
              genre: 'male',
            };
            return Promise.resolve(new User(userData));
          }
          return Promise.resolve(null);
        },
      ),
    })),
  };
});

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    service = new LoginService();
  });

  it('should authenticate successfully and return a token', async () => {
    const token = await service.authenticate('teste@teste.com', 'senha123');
    expect(token).toBe('token-fake');
  });

  it('should throw an error if email is not provided', async () => {
    await expect(service.authenticate('', 'senha123')).rejects.toMatchObject({
      statusCode: 403,
    });
  });

  it('should throw an error for incorrect password', async () => {
    await expect(
      service.authenticate('teste@teste.com', 'wrongpassword'),
    ).rejects.toMatchObject({
      statusCode: 403,
    });
  });

  it('should throw an error for non-existent email', async () => {
    await expect(
      service.authenticate('nonexistent@x.com', 'senha123'),
    ).rejects.toMatchObject({
      statusCode: 403,
    });
  });
});
