import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { UnAuthorizedException } from "../app.exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (request.currentUser) {
      return true;
    }

    throw new UnAuthorizedException()
  }
}
