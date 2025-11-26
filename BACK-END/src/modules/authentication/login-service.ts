import { ExceptionDTO } from "../../shared/dtos/error-dto";
import { jwtToken } from "../../shared/jwt/jwt-token";
import * as bcrypt from "bcrypt";
import { FindUserByEmailRepository } from "../users/infra/repositories/find-user-by-email-repository";

export class LoginService {
    private readonly jwt = new jwtToken();
   private readonly findUserByEmail = new FindUserByEmailRepository();
    async authenticate(email: string, password: string) {
        if (!email || !password) {
            throw new ExceptionDTO({
                message: "email não encontrado",
                messageDev: "email and password required",
                method: "login",
                name: "LoginError",
                statusCode: 403,
            });
        }

        const userEntity = await this.findUserByEmail.execute({email});
        if(!userEntity?.password)  throw new ExceptionDTO({
            message: "email ou senha inválidos",
            messageDev: "email or password incorrect",
            method: "login",
            name: "LoginError",
            statusCode: 403,
        })
        if (!userEntity || !(await this.isPasswordValid(password, userEntity.password))) {
            throw new ExceptionDTO({
                message: "email ou senha inválidos",
                messageDev: "email or password incorrect",
                method: "login",
                name: "LoginError",
                statusCode: 403,
            });
        }

        return this.jwt.generateTokenJwt(userEntity);
    }

    private async isPasswordValid(inputPassword: string, storedPassword: string) {
        return bcrypt.compare(inputPassword, storedPassword);
    }
}