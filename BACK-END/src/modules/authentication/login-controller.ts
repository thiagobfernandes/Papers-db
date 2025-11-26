import { ExceptionDTO } from "../../shared/dtos/error-dto";
import { ResponseDTO } from "../../shared/dtos/response-dto";
import { LoginSchema } from "../../shared/schemas/login-schema";
import { LoginService } from "./login-service";
import { Request, Response } from "express";

export class LoginController {
   constructor(private readonly loginService:LoginService) {}

    async login(req: Request, res: Response) {
        try {
            const validationResult = LoginSchema.validate(req.body);
            if (validationResult instanceof ExceptionDTO) {
                return res.status(validationResult.statusCode).json(validationResult);
            }
            
            const { email, password } = validationResult;
            const token = await this.loginService.authenticate(email, password);
            
            return res.status(200).json(new ResponseDTO({
                content: token,
                message: "Token gerado com sucesso",
                status: 200,
            }));
        } catch (error) {
            if (error instanceof ExceptionDTO) {
                return res.status(error.statusCode).json(error);
            }
            return res.status(500).json(new ExceptionDTO({
                message: "Erro interno no servidor",
                messageDev: `internal server error`,
                method: "login",
                name: "ServerError",
                statusCode: 500,
            }));
        }
    }
}