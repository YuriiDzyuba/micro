import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDoesntExistExceptions extends HttpException {
  constructor() {
    super(`User doesn't exist`, HttpStatus.BAD_REQUEST);
  }
}

export class CantUpdateUserException extends HttpException {
  constructor() {
    super(`Can not update user`, HttpStatus.EXPECTATION_FAILED);
  }
}

export class UserExistException extends HttpException {
  constructor() {
    super(`User exists`, HttpStatus.BAD_REQUEST);
  }
}

export class NotImplementedFeatureException extends HttpException {
  constructor() {
    super(`not implemented`, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class WrongPasswordException extends HttpException {
  constructor() {
    super(`wrong password`, HttpStatus.FORBIDDEN);
  }
}
