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

export class OverSizeAvatarException extends HttpException {
    constructor() {
        super(`avatar size must be less than 3MB`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

export class MimetypeAvatarException extends HttpException {
    constructor() {
        super(`avatar mimetype must be only .jpeg or .png',`, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}