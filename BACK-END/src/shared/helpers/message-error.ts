import { ZodError } from "zod";

export const messageError = (error:ZodError):string => {
    return error.issues.map(i => i.message).join(',');
}