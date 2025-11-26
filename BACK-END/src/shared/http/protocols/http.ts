import { User } from "../../../modules/users/domain/entities/user";
import { ExceptionDTO } from "../../dtos/error-dto";
import { ResponseDTO } from "../../dtos/response-dto";
import { Logger } from "../../helpers/logger";

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError,
}

interface IExceptionDTO {
  statusCode?: number;
  message?: string;
  messageDev?: string;
  method?: string;
  name?: string;
}

export type HttpResponse = {
  message: string;
  status: number;
  content: unknown;
  page?: number;
  pageSize?: number;
  total?: number;
};

export type HttpRequest = {
  body?: any;
  headers?: any;
  query?: any;
  file?: Express.Multer.File;
  params?: any;
  user?: User;
  isAdmin?: boolean;
};



export const badRequest = (error: IExceptionDTO): ExceptionDTO => {
  Logger.error(
    `Bad Request Error: ${error.messageDev ?? error.message}, ${error.method}`
  );
  return new ExceptionDTO({
    message: error.message ?? "unexpected error",
    statusCode: HttpStatusCode.badRequest,
    messageDev: error.messageDev,
    method: error.method,
    name: "BadRequest",
  } as ExceptionDTO);
};

export const serverError = (error: IExceptionDTO): ExceptionDTO => {
  Logger.error(
    `Internal Server Error: ${error.messageDev ?? error.message}, ${error.method}`
  );
  return new ExceptionDTO({
    message: error.message ?? "Internal Server Error",
    statusCode: HttpStatusCode.serverError,
    messageDev: error.messageDev ?? "unexpected error",
    method: error.method,
    name: "InternalServerError",
  } as ExceptionDTO);
};

export const unauthorized = (error: IExceptionDTO): ExceptionDTO => {
  Logger.error(
    `Unauthorized Error: ${error.messageDev ?? error.message}, ${error.method}`
  );
  return new ExceptionDTO({
    message: error.message ?? "unauthorized error",
    statusCode: HttpStatusCode.unauthorized,
    messageDev: error.messageDev ?? "unexpected error",
    method: error.method,
    name: "Unauthorized",
  } as ExceptionDTO);
};

export const notFound = (error: IExceptionDTO): ExceptionDTO => {
  Logger.error(
    `NotFound Error: ${error.messageDev ?? error.message}, ${error.method}`
  );
  return new ExceptionDTO({
    message: error.message ?? "not found error",
    statusCode: HttpStatusCode.notFound,
    messageDev: error.messageDev ?? "not found",
    method: error.method,
    name: "NotFound",
  } as ExceptionDTO);
};


export const ok = (data: HttpResponse): ResponseDTO => {
  Logger.info(`OK Response: ${data.message}`);
  data.status = HttpStatusCode.ok;
  return data;
};

export const created = (data: HttpResponse): HttpResponse => {
  Logger.info(`Created Response: ${data.message}`);
  data.status = HttpStatusCode.created;
  return data;
};
