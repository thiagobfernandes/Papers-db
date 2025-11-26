import { ExceptionDTO } from "../../dtos/error-dto";
import { ResponseDTO } from "../../dtos/response-dto";
import { Controller, serverError } from "../protocols";
import { Response } from 'express';
import { Request } from "express";
import { ExpressRequest } from "../../dtos/express-request-dto";
import { Logger } from "../../helpers/logger";

function isResponseDTO(obj: any): obj is ResponseDTO {
    return obj && typeof obj === "object" && "status" in obj;
}

function isExceptionDTO(obj: any): obj is ExceptionDTO {
    return obj && typeof obj === "object" && "statusCode" in obj;
}

export const AdapterRoute = (controller: Controller, route: string) => {
    return async (req: Request, res: Response) => {
        try {
            Logger.info(`RouteAdapter: Handling request for route ${route}, method ${req.method}`);
            const httpRequest: ExpressRequest = {
                body: req.body,
                headers: req.headers,
                params: req.params,
                user: (req as any).user ? (req as any).user : undefined,
                query: req.query,
                file: req.file ? req.file : undefined,
                isAdmin: (req as any).isAdmin ? (req as any).isAdmin : false

            } as ExpressRequest;

   
            const httpResponse = await controller(httpRequest);
            if (isResponseDTO(httpResponse)) {
                Logger.info(`RouteAdapter: Sending response for route ${route} with status ${httpResponse.status} and message: ${httpResponse.message}`);
                if(httpResponse.content) {
                    if(httpResponse.content.hasOwnProperty('password')) {
                        delete (httpResponse.content as any).password;
                    }
                }
                return res.status(httpResponse.status).json(httpResponse);
            }

            if (isExceptionDTO(httpResponse)) {
                Logger.error(`RouteAdapter: Error occurred in route ${route} with status ${httpResponse.statusCode} and message: ${httpResponse.messageDev}`);
                return res.status(httpResponse.statusCode).json(httpResponse);
            }

            return res.status(500).json(
                serverError({
                    message: "Unexpected error",
                    messageDev: "Internal Server Error",
                    method: route,
                })
            );

        } catch (error: any) {

            if (error instanceof ExceptionDTO) {
                return res.status(error.statusCode).json(error);
            }
            return res.status(500).json(
                serverError({
                    message: "Unexpected error",
                    messageDev: error?.message ?? "Internal Server Error",
                    method: route,
                })
            );
        }
    };
};