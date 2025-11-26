import { z } from "zod";

export const paperSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Título obrigatório"),
  language: z.string().min(1, "Linguagem obrigatória"),
  platformId: z.string().min(1, "Plataforma obrigatória").transform(Number),
  document: z
    .any()
    .optional()
    .refine((file) => !file || file[0]?.size <= 5_000_000, "Tamanho máximo de 5MB.")
    .refine((file) => !file || file[0]?.name.length <= 100, "Nome do arquivo deve ter no máximo 40 caracteres."),
});
