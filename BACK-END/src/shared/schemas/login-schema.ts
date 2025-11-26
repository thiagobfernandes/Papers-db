import Joi from "joi";
import { LoginDTO } from "../../modules/authentication/dtos/login-dto";
import { ExceptionDTO } from "../dtos/error-dto";

export class LoginSchema {
    static readonly schema = Joi.object({
        email: Joi.string().email().min(3).max(30).required(),
        password: Joi.string().min(6).required()
    });

    static validate(data: any): LoginDTO | ExceptionDTO {
        const { error, value } = this.schema.validate(data, { abortEarly: false });
        if (error) {
            return new ExceptionDTO({
                message: "Erro na validação dos dados de login",
                statusCode: 400,
                messageDev: error.details.map((detail) => detail.message).join(", "),
                method: "LoginSchema",
                name: "ValidationError",
            });
        }
        return value;
    }
}