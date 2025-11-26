import { ExceptionDTO } from "../../../../shared/dtos/error-dto";

const error = (message: string, method: string) => new ExceptionDTO({
    message,
    statusCode: 400,
    method,
    name: "Validation Error",
});

export const NameValidation = (name: string): string  => {
    if (name.length < 3) {
        throw error("Nome deve ter no mínimo 3 caracteres", "NameValidation");
    }
    if (name.length > 100) {
        throw error("Nome deve ter no máximo 100 caracteres", "NameValidation");
    }
    return name;
}

export const UsernameValidation = (username: string): string  => {
    if (username.length < 3) {
        throw error("Nome de usuário deve ter no mínimo 3 caracteres", "UsernameValidation");
    }
    if (username.length > 30) {
        throw error("Nome de usuário deve ter no máximo 30 caracteres", "UsernameValidation");
    }
    return username;
}

export const EmailValidation = (email: string): string  => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw error("Email inválido", "EmailValidation");
    }
    return email;
}

export const CpfValidation = (cpf: string): string  => {
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
        throw error("CPF inválido, deve conter 11 dígitos numéricos", "CpfValidation");
    }
    return cpf;
}

export const PasswordValidation = (password: string): string  => {
    if (password.length < 6) {
        throw error("Senha deve ter no mínimo 6 caracteres", "PasswordValidation");
    }
    return password;
}

export const PrimaryPhoneValidation = (phone: string): string  => {
    if (phone.length < 10) {
        throw error("Telefone primário inválido", "PrimaryPhoneValidation");
    }
    return phone;
}

export const SecondaryPhoneValidation = (phone: string | undefined): string | undefined  => {
    if (phone && phone.length < 10) {
        throw error("Telefone secundário inválido", "SecondaryPhoneValidation");
    }
    return phone;
}

export const DateOfBirthValidation = (dateOfBirth: Date): Date  => {
    if (dateOfBirth > new Date()) {
        throw error("Data de nascimento não pode ser no futuro", "DateOfBirthValidation");
    }
    return dateOfBirth;
}

export const GenreValidation = (genre: string): string  => {
    const validGenres = ["Masculino", "Feminino", "Outro"];
    if (!validGenres.includes(genre)) {
        throw error(`Gênero inválido. Deve ser um de: ${validGenres.join(", ")}`, "GenreValidation");
    }
    return genre;
}