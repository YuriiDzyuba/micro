import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { SafeUserType } from "../user.module/types/safeUser.type";

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): SafeUserType => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    if (!request.currentUser) return null;

    if (data) return request.currentUser[data];

    return request.currentUser;
  },
);
