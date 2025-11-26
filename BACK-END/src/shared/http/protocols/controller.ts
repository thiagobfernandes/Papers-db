import { ExceptionDTO } from '../../dtos/error-dto';
import { ResponseDTO } from '../../dtos/response-dto';
import { HttpRequest } from './';

export type Controller = (params: Controller.Params) => Promise<ResponseDTO | ExceptionDTO>;
export namespace Controller {
  export type Params = HttpRequest;
  export type ResponseError = ExceptionDTO
  export type Response = Promise<ResponseDTO> | ResponseError;
}
