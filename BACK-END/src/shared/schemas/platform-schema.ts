import { z } from "zod";

export const PlatformCreateSchema = z.object({
  id: z
    .number({
      invalid_type_error: "O id deve ser um número",
    })
    .optional(),

  name: z
    .string({
      required_error: "O nome é obrigatório",
      invalid_type_error: "O nome deve ser um texto",
    })
    .min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export const PlatformFindPaginationSchema = z.object({
  search: z.object({
    name: z.string().optional(),
  }).optional(),
  filter: z.object({
    id: z.number().optional(),
    name: z.boolean().optional(),
  }).optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
});
