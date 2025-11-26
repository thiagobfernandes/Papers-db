import { NextFunction, Response } from "express";
import { ExceptionDTO } from "../../dtos/error-dto";
import { ExpressRequest } from "../../dtos/express-request-dto";

export class IsAdminMiddleware {


  async verifyToken(req: ExpressRequest, res: Response, next: NextFunction) {

    try {
      if (req.user.isAdmin === false) {
        req.isAdmin = false
        return next();

      }
      req.isAdmin = true
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

