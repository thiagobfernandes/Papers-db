import { ExceptionDTO } from "../../../../shared/dtos/error-dto";
import { NameValidation } from "../values-objects";

interface IPlatformProps {
    id?: number;
    name: string;
}

export class Platform {
    id?: number;
    name: string;

    constructor(props: IPlatformProps) {
        this.id = props.id;
        this.name = props.name;
    }

    static create(props: IPlatformProps): Platform {
        props.name = NameValidation(props.name)
        return new Platform(props)

    }
    static fromEntity<T extends IPlatformProps> (entity: T): Platform  {
    return new Platform({
        id: entity.id,
        name: entity.name,
    })

}
} 
