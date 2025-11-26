import { z } from "zod";
import { isValidCPF } from "../../../lib/utils";

export const UserSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    username: z.string().min(1, "Usuário obrigatório"),
    email: z.string().min(1, "Email obrigatório").email("Email inválido"),
    cpf: z
      .string()
      .min(11, "CPF obrigatório")
      .transform((val) => val.replace(/[^\d]+/g, ""))
      .refine(isValidCPF, "CPF inválido"),
    password: z
      .string()
      .min(6, "Senha com no mínimo 6 caracteres")
      .refine(
        (pwd) => /[A-Z]/.test(pwd),
        "Deve conter pelo menos 1 letra maiúscula"
      )
      .refine((pwd) => /[0-9]/.test(pwd), "Deve conter pelo menos 1 número")
      .refine(
        (pwd) => /[^A-Za-z0-9]/.test(pwd),
        "Deve conter pelo menos 1 caractere especial"
      ),
    confirmPassword: z.string().min(6, "Senha com no mínimo 6 caracteres"),
    primaryPhone: z.string().min(10, "Telefone obrigatório"),
    secondaryPhone: z.string().optional(),
    isAdmin: z.boolean().optional(),
    dateOfBirth: z.date({ required_error: "Data de nascimento obrigatória" }),
    genre: z.enum(["Masculino", "Feminino", "Outro"], {
      errorMap: () => ({ message: "Gênero obrigatório" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
      });
    }
  })
  .transform((data) => ({
    ...data,
    secondaryPhone: data.secondaryPhone || undefined,
  }));

export const UpdateUserSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  username: z.string().min(1, "Usuário obrigatório"),
  email: z.string().min(1, "Email obrigatório").email("Email inválido"),
  cpf: z
    .string()
    .min(11, "CPF obrigatório")
    .transform((val) => val.replace(/[^\d]+/g, ""))
    .refine(isValidCPF, "CPF inválido"),
  primaryPhone: z.string().min(10, "Telefone obrigatório"),
  secondaryPhone: z.string().optional(),
   isAdmin: z.boolean().optional(),
  dateOfBirth: z.date({ required_error: "Data de nascimento obrigatória" }),
  genre: z.enum(["Masculino", "Feminino", "Outro"], {
    errorMap: () => ({ message: "Gênero obrigatório" }),
  }),
});
