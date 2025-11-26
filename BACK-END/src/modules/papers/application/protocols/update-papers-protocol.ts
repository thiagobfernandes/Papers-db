import { Papers } from "../../domain/entities/papers";

export namespace UpdatePapersProtocol {
    export type Params = {
        title: string;
        language: string;
        platformId: number;
    }
    export type Response = Promise<Papers>
}

export interface UpdatePapersUsecaseProtocolInterface {
    execute(params: UpdatePapersProtocol.Params, userId:number, papersId:number): UpdatePapersProtocol.Response;
}

