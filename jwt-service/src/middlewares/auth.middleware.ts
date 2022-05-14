import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import {
  UserApiServiceInterfaceToken,
  UserServiceInterface,
} from '../user.module/types/userService.interface';
import { TokenTypes } from '../types/tokenTypes.enum';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
  ) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.currentUser = null;
      next();
      return;
    }

    const tokenType = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];

    if (
      tokenType !== TokenTypes.ACCESS_TOKEN &&
      tokenType !== TokenTypes.REFRESH_TOKEN
    ) {
      req.currentUser = null;
      next();
      return;
    }

    try {
      const decodedUserData = verify(
        token,
        tokenType === TokenTypes.ACCESS_TOKEN
          ? process.env.ACCESS_JWT_SECRET
          : process.env.REFRESH_JWT_SECRET,
      );
      const user = await this.userApiService.findUserById(decodedUserData.id);

      if (!user) {
        throw new Error();
      }

      tokenType === TokenTypes.ACCESS_TOKEN
        ? (req.currentUser = user)
        : (req.userToRefreshTokens = user);
    } catch (err) {
      throw new HttpException(`invalid ${tokenType}`, HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
