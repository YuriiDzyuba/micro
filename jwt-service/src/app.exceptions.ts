import {HttpException, HttpStatus} from "@nestjs/common";

export class UnAuthorizedException extends HttpException {
    constructor() {
        super(`you are not authorized`, HttpStatus.UNAUTHORIZED);
    }
}
export class InsufficientAccessRightsException extends HttpException {
    constructor() {
        super(`you don't have permission to access`, HttpStatus.FORBIDDEN);
    }
}