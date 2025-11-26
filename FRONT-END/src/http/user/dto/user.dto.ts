export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  cpf: string;
  password: string;
  primaryPhone: string;
  secondaryPhone?: string;
  dateOfBirth: Date;
  genre: string;
}

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  email?: string;
  cpf?: string;
  password?: string;
  isAdmin?:boolean
  primaryPhone?: string;
  secondaryPhone?: string;
  dateOfBirth?: Date;
  genre?: string;
  acessToken?:string;
}

export interface UserDTO {
  id?: number;
  name: string;
  username: string;
  email: string;
  cpf: string;
  primaryPhone: string;
  isAdmin?:boolean
  secondaryPhone: string;
  dateOfBirth: Date;
  genre: string;
}
