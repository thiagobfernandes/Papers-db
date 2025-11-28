
import z from "zod";

export const PapersFindPaginationSchema = z.object({
  search: z
    .object({
      title: z.string().optional(),
      language: z.string().optional(),
    })
    .optional(),

  filter: z
    .object({
      id: z.number().optional(),
      userId: z.number().optional(),
      platformId: z.number().optional(),
    })
    .optional(),

  order: z
    .object({
      createdAt: z.enum(["ASC", "DESC"]).optional(),
    })
    .optional(),

  page: z.number().optional(),
  pageSize: z.number().optional(),
});



export const PapersCreateSchema = z.object({
  title: z.preprocess(
    (value) =>
      value === undefined || value === null
        ? undefined
        : String(value),
    z.string({
      required_error: "O título é obrigatório",
      invalid_type_error: "O título deve ser texto",
    })
      .min(3, "O título deve ter no mínimo 3 caracteres")
      .max(100, "O título deve ter no máximo 100 caracteres"),
  ),

  language: z.string({
    required_error: "A linguagem é obrigatória",
    invalid_type_error: "A linguagem deve ser texto",
  }).min(2, "A linguagem deve ter no mínimo 2 caracteres"),

  platformId: z.number({
    required_error: "O platformId é obrigatório",
    invalid_type_error: "O platformId deve ser um número",
  }),
  documentPath: z.string().optional(),
});

//   static querySchema = z.object({
//     search: z
//       .object({
//         title: z.string().optional(),
//         language: z.string().optional(),
//       })
//       .optional(),

//     filter: z
//       .object({
//         id: z.number().optional(),
//         userId: z.number().optional(),
//         platformId: z.number().optional(),
//       })
//       .optional(),

//     order: z
//       .object({
//         createdAt: z.enum(["ASC", "DESC"]).optional(),
//       })
//       .optional(),

//     page: z.number().optional(),
//     pageSize: z.number().optional(),
//   });
// 