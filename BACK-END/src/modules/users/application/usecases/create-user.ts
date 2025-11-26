import * as bcrypt from "bcrypt";
import { User } from "../../domain/entities/user";
import { CreateUserProtocol, CreateUserUsecaseProtocolInterface } from "../protocols/create-user-protocol";
import { FindUserByCpfRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-cpf";
import { FindUserByEmailRepositoryProtocolInterface } from "../../domain/repositories/find-user-by-email";
import { CreateUserRepositoryProtocolInterface } from "../../domain/repositories/create-user";
import { badRequest } from "../../../../shared/http/protocols";
import { Logger } from "../../../../shared/helpers/logger";

export class CreateUserUseCase implements CreateUserUsecaseProtocolInterface {
  constructor(
    private createUserRepository: CreateUserRepositoryProtocolInterface,
    private findUserByCpfRepository: FindUserByCpfRepositoryProtocolInterface,
    private findUserByEmailRepository: FindUserByEmailRepositoryProtocolInterface
  ) { }

  async execute(
    params: CreateUserProtocol.Params
  ): CreateUserProtocol.Response {
    const user = User.create(params);

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(user.password!, salt);
    user.password = hashedPassword;

    await this.userRuleValidation(user);

    const createdUserPlain = await this.createUserInRepository(user);
    const createdUserDomain = User.fromEntity(createdUserPlain);

    return createdUserDomain
  }

  private async createUserInRepository(user:User) {
   return await this.createUserRepository.execute({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      cpf: user.cpf,
      primaryPhone: user.primaryPhone,
      secondaryPhone: user.secondaryPhone,
      dateOfBirth: user.dateOfBirth,
      genre: user.genre,
      created_at: user.created_at,
    });
  }

  private async userRuleValidation(user: User): Promise<void> {
    const existenceUserWithSameCpf = await this.findUserByCpfRepository.execute( { cpf: user.cpf } );

    if (existenceUserWithSameCpf) {
      Logger.error(`CreateUserUseCase: CPF já cadastrado - ${user.cpf}`);

      throw badRequest({ message: "CPF já cadastrado", messageDev: "CPF already exist", method: "create user", name: "cpf error", statusCode: 400 });
    }
    const existenceUserWithSameEmail = await this.findUserByEmailRepository.execute(
      { email: user.email }
    );

    if (existenceUserWithSameEmail) {
      throw badRequest({ message: "Email já cadastrado", messageDev: "Email already exist", method: "create user", name: "email error", statusCode: 400 });
    }
  }
}