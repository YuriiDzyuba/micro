import { HttpException, HttpStatus } from '@nestjs/common';

export class CantLoginUserException extends HttpException {
  constructor() {
    super(`Can not login user`, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
