import {LoginRequestInterface} from "./loginRequest.interface";

export interface RegisterRequestInterface extends LoginRequestInterface{
    password: string
}
