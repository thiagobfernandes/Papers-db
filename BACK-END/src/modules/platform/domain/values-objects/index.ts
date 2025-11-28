import { ExceptionDTO } from "../../../../shared/dtos/error-dto";


const error = (message: string, method: string) => new ExceptionDTO({
    message,
    statusCode: 400,
    method,
    name: "Validation Error",
})

export const IdValidation = (id: number): number  => {
    if (id <= 0) {
        throw error("ID inválido", "IdValidation");
    }
    return id;
}

export const NameValidation = (name: string): string  => {
    if (name.length < 3) {
        throw error("Título do paper deve ter no mínimo 3 caracteres", "TitleValidation");
    }
    if (name.length > 255) {
        throw error("Título do paper deve ter no máximo 255 caracteres", "TitleValidation");
    }
  
    return name;
}




