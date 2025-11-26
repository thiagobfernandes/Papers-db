import { NextFunction, Response } from "express";
import { ExceptionDTO } from "../../dtos/error-dto";
import { jwtToken } from "../../jwt/jwt-token";
import { ExpressRequest } from "../../dtos/express-request-dto";
import { FindUserByIdRepository } from "../../../modules/users/infra/repositories/find-user-by-id-repository";
import { unauthorized } from "../../http/protocols";
import { User } from "../../../modules/users/domain/entities/user";
import { Logger } from "../../helpers/logger";

export class JwtMiddleware {
  private readonly tokenService = new jwtToken();
  private readonly findUserByIdRepository = new FindUserByIdRepository();


  async verifyToken(req: ExpressRequest, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      return this.respondWithError(res, 'Nenhum token encontrado', 'Nenhum token fornecido');
    }

    const decoded = this.tokenService.verifyJwtToken(token);

    if (decoded instanceof ExceptionDTO) {

      return this.respondWithError(res, 'Token inválido', 'Token inválido fornecido');
    }

    try {
      const user = await this.loadUser(decoded.userId);

      if (user instanceof ExceptionDTO) {
        throw new Error('Usuário inválido');
      }

      req.token = token;
      req.isAdmin
      req.user = user;
      return next();
    } catch {
      return this.respondWithError(res, 'Usuário não encontrado', 'Usuário não localizado com base no token');
    }
  }

  private extractToken(req: ExpressRequest): string | undefined {
    return req.get('authorization')?.split(' ')[1];
  }

  private respondWithError(res: Response, message: string, messageDev: string) {
    const error = new ExceptionDTO({
      message,
      messageDev,
      method: 'JwtMiddleware.verifyToken',
      statusCode: 403,
      name: 'Unauthorized',
    });
    return res.status(error.statusCode).json(error);
  }

  private async loadUser(id: number):Promise<User> {
    try {
      const userEntity = await this.findUserByIdRepository.execute({ id });
      if (!userEntity) {
        throw unauthorized({
          message: 'Usuário não encontrado',
          messageDev: `Nenhum usuário encontrado com o ID ${id}`,
          method: 'JwtMiddleware.loadUser'
        })
      }
      return userEntity
    } catch (error) {
      throw error
    }

  }
}
