import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExistException extends HttpException {
  constructor() {
    super(`User doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
