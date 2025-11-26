import { Express, Request } from "express"
import { User } from "../../modules/users/domain/entities/user"
export interface ExpressRequest<T = any> extends Request {
token:string
user:User 
isMaster?:boolean
isAdmin?:boolean
body:T

}