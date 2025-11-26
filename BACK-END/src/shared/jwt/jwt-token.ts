import { Console } from "console";
import { ExceptionDTO } from "../dtos/error-dto";
import { TokenPayload } from "../dtos/token-payload";
import { appConfig } from "../schemas/app-config-env";
import * as jwt from 'jsonwebtoken';
import { User } from "../../modules/users/domain/entities/user";
import { Logger } from "../helpers/logger";

const env = appConfig.loadConfig()
const secretKey = env.JWT_SECRET

export type JwtPayload = {
    id: number;
    isMaster: boolean;
    isAdmin: boolean;
}
export class jwtToken {


    generateTokenJwt(user: User | JwtPayload) {

        const payload = {
            userId: user.id,
            isMaster: user.isMaster ?? false,
            isAdmin: user.isAdmin ?? false
        }
        Logger.info(`Generating JWT token for user ID ${user.id} with payload ${JSON.stringify(payload)}`);
        const token = jwt.sign(payload, secretKey, { expiresIn: '48h' })
        return token
    }

    verifyJwtToken(token: string) {
        try {
            const decoded = jwt.verify(token, secretKey)
            return decoded as TokenPayload

        } catch (e) {
            return new ExceptionDTO({
                message: 'Não autorizado',
                messageDev: 'User unauthorized token invalid',
                method: 'verifyJwtToken',
                statusCode: 403,
                name: 'error'
            })

        }

    }

}