import { Logger } from "../../../../shared/helpers/logger";
import { User } from "../../../users/domain/entities/user";
import { LanguageValidation, PlatformIdValidation, TitleValidation, UserIdValdiation } from "../values-objects";

interface IPapersProps {
    id?: number;
    title: string;
    language: string;
    userId?: number;
    platformId: number;
    createdAt?: Date;
    user?:User
    documentPath?: string;

}


export class Papers {
    id?: number;
    title: string;
    language: string;
    userId?: number;
    platformId: number;
    createdAt?: Date;
    user?:User
    documentPath?: string;


    constructor(props: IPapersProps) {
        this.id = props.id;
        this.title = props.title;
        this.language = props.language;
        this.userId = props.userId;
        this.platformId = props.platformId;
        this.createdAt = props.createdAt;
        this.user = props.user ?? undefined;
        this.documentPath = props.documentPath ?? undefined;
    }

    static create(props: IPapersProps): Papers {
        props.title = TitleValidation(props.title)
        props.language = LanguageValidation(props.language)
        props.platformId = PlatformIdValidation(props.platformId)
        props.createdAt = new Date()
        props.userId = props.userId ? UserIdValdiation(props.userId) : undefined
        return new Papers(props)

    }

    static fromEntity<T extends IPapersProps>(entity: T): Papers  {
        return new Papers({
            id: entity.id,
            title: entity.title,
            language: entity.language,
            userId: entity.userId,
            platformId: entity.platformId,
            createdAt: entity.createdAt,
            user: entity.user ? User.fromEntity(entity.user) : undefined,
            documentPath: entity.documentPath,
        })
    }

}