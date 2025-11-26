import { CpfValidation, DateOfBirthValidation, EmailValidation, GenreValidation, NameValidation, PasswordValidation, PrimaryPhoneValidation, SecondaryPhoneValidation, UsernameValidation } from "../values-objects";

export interface IUser {
    id?: number;
    name: string;
    username?: string;
    email: string;
    isMaster?: boolean;
    isAdmin?: boolean;
    password?: string;
    cpf: string;
    primaryPhone?: string;
    secondaryPhone?: string;
    dateOfBirth: Date;
    genre: string;
    created_at?: Date;
}
export class User {
    id?: number;
    name: string;
    isAdmin?: boolean;
    username?: string;
    email: string;
    password?: string;
    isMaster?: boolean;
    cpf: string;
    primaryPhone?: string;
    secondaryPhone?: string;
    dateOfBirth: Date;
    genre: string;
    created_at?: Date;

    constructor(props: IUser) {
        this.id = props.id ?? undefined;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email
        this.isMaster = props.isMaster ?? false;
        this.isAdmin = props.isAdmin ?? false;
        this.password = props.password;
        this.cpf = props.cpf;
        this.primaryPhone = props.primaryPhone;
        this.secondaryPhone = props.secondaryPhone;
        this.dateOfBirth = props.dateOfBirth;
        this.genre = props.genre;
        this.created_at = props.created_at ?? new Date();
    }

    static create(props: IUser): User {
        props.name = NameValidation(props.name);
        props.cpf = CpfValidation(props.cpf);
        props.email = EmailValidation(props.email);
        props.genre = GenreValidation(props.genre);
        props.isAdmin = props.isAdmin ?? false;
        props.isMaster = props.isMaster ?? false;
        if (props.password) {
            props.password = PasswordValidation(props.password);
        }
        props.primaryPhone = props.primaryPhone ? PrimaryPhoneValidation(props.primaryPhone) : undefined;
        props.secondaryPhone = props.secondaryPhone ? SecondaryPhoneValidation(props.secondaryPhone) : undefined;
        props.dateOfBirth = DateOfBirthValidation(props.dateOfBirth);
        props.username = props.username ? UsernameValidation(props.username) : undefined;
        return new User(props)

    }
    static fromEntity<T extends IUser>(entity: T): User {
        return new User({
            id: entity.id,
            name: entity.name,
            username: entity.username,
            email: entity.email,
            isAdmin: entity.isAdmin,
            isMaster: entity.isMaster,
            password: entity.password,
            cpf: entity.cpf,
            primaryPhone: entity.primaryPhone,
            secondaryPhone: entity.secondaryPhone,
            dateOfBirth: entity.dateOfBirth,
            genre: entity.genre,
            created_at: entity.created_at,
        })
    }

}