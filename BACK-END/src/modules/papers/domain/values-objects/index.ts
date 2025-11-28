
//   id?: number;
//     title: string;
//     language: string;
//     userId: number;
//     platformId: number;
//     createdAt: Date;

import { ExceptionDTO } from "../../../../shared/dtos/error-dto";

// import { ExceptionDTO } from "../../../../shared/dtos/error-dto";

// export class Title {
//     private constructor(private readonly title: string) {
//         title= this.title
//     }
// }

const error = (message: string, method: string) => new ExceptionDTO({
    message,
    statusCode: 400,
    method,
    name: "Validation Error",
})

export const TitleValidation = (title: string): string  => {
    if (title.length < 3) {
        throw error("Título do paper deve ter no mínimo 3 caracteres", "TitleValidation");
    }
    if (title.length > 255) {
        throw error("Título do paper deve ter no máximo 255 caracteres", "TitleValidation");
    }
   
    return title;
}

export const LanguageValidation = (language: string): string  => {
    if (language.length === 0) {
        throw error("Linguagem do paper não pode ser vazia", "LanguageValidation");
    }
    if (language.length > 100) {
        throw error("Linguagem do paper deve ter no máximo 100 caracteres", "LanguageValidation");
    }
    return language;
}

export const PlatformIdValidation = (platformId: number): number  => {
    if (!Number.isInteger(platformId) || platformId <= 0) {
        throw error("ID da plataforma deve ser um número inteiro positivo", "PlatformIdValidation");
    }
    return platformId;
}


export const UserIdValdiation = (userId?: number): number | undefined  => {
    if(!userId) {
        return undefined
    }
    if (!Number.isInteger(userId) || userId <= 0) {
        throw error("ID do usuario deve ser um número inteiro positivo", "PlatformIdValidation");
    }
    return userId;
}

