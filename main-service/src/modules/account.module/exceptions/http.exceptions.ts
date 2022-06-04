import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountExistsException extends HttpException {
    constructor() {
        super(`account exist`, HttpStatus.BAD_REQUEST);
    }
}

export class CantUpdateUserException extends HttpException {
    constructor() {
        super(`Can not update user`, HttpStatus.EXPECTATION_FAILED);
    }
}