import { Papers } from "../../domain/entities/papers";

export namespace CreatePapersProtocol {
    export type Params = {
        title: string;
        language: string;
        platformId: number;
        documentPath?: string;
    }
    export type Response = Promise<Papers>
}

export interface CreatePapersUsecaseProtocolInterface {
    execute(params: CreatePapersProtocol.Params,userId:number): Promise<CreatePapersProtocol.Response>;
}
