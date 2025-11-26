import { NextFunction, Response } from "express";
import { ExceptionDTO } from "../../dtos/error-dto";
import { ExpressRequest } from "../../dtos/express-request-dto";

export class isMaterMiddleware {


  async verifyToken(req: ExpressRequest, res: Response, next: NextFunction) {


    try {
      if(!req.user.isMaster && req.body.isAdmin) {
        return this.respondWithError(res, 'Acesso negado', 'Usuário não possui privilégios de Administrador geral');
      }
      req.isMaster = true
      return next();
    } catch {
      return this.respondWithError(res, 'Usuário não encontrado', 'Usuário não localizado com base no token');
    }
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


  }

