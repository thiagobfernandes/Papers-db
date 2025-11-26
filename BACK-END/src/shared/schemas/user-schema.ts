import z from "zod";

const GenreEnum = z.enum(["Masculino", "Feminino", "Outro"], {
  errorMap: () => ({ message: "Gênero deve ser Masculino, Feminino ou Outro" }),
});

export const UserCreateSchema = z.object({
  id: z.number().optional(),

  name: z.string({
    required_error: "O nome é obrigatório",
    invalid_type_error: "O nome deve ser texto",
  }).min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  username: z.string({
    required_error: "O usuário é obrigatório",
  }).min(3, "O usuário deve ter no mínimo 3 caracteres")
    .max(30, "O usuário deve ter no máximo 30 caracteres"),

  email: z.string({
    required_error: "O email é obrigatório",
  }).email("Formato de email inválido"),

  cpf: z.string({
    required_error: "O CPF é obrigatório",
  }).length(11, "O CPF deve ter exatamente 11 caracteres")
    .regex(/^\d+$/, "O CPF deve conter apenas números"),

  password: z.string({
    required_error: "A senha é obrigatória",
  }).min(6, "A senha deve ter no mínimo 6 caracteres"),

  primaryPhone: z.string({
    required_error: "O telefone principal é obrigatório",
  }),

  secondaryPhone: z.string().optional(),

  dateOfBirth: z.coerce.date({
    required_error: "A data de nascimento é obrigatória",
    invalid_type_error: "Data de nascimento inválida",
  }).max(new Date(), "A data de nascimento não pode ser no futuro"),

  genre: GenreEnum,
}).passthrough();


export const UserUpdateSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  username: z.string().min(3).max(30).optional(),

  cpf: z.string()
    .length(11, "O CPF deve ter exatamente 11 caracteres")
    .regex(/^\d+$/, "O CPF deve conter apenas números")
    .optional(),
  primaryPhone: z.string().min(11, "O telefone deve ter no mínimo 11 caracteres").optional(),
  secondaryPhone: z.string().min(11, "O telefone deve ter no mínimo 11 caracteres").optional(),

  dateOfBirth: z.coerce.date().max(new Date()).optional(),
  genre: GenreEnum.optional(),
}).passthrough();


export const UserResponseSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  cpf: z.string(),
  primaryPhone: z.string(),
  secondaryPhone: z.string().optional().nullable(), // Adicionei nullable caso venha null do banco
  dateOfBirth: z.coerce.date(),
  genre: z.string(),
}).passthrough();





export type UserCreateInput = z.infer<typeof UserCreateSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;