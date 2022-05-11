import {
  HttpException,
  HttpStatus, Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { UserApiServiceInterfaceToken, UserServiceInterface } from "../user.module/types/userService.interface";

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

    const tokenName = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];

    if (tokenName !== 'accessToken' && tokenName !== 'refreshToken') {
      req.currentUser = null;
      next();
      return;
    }

    try {
      const decodedUserData = verify(
        token,
        tokenName === 'accessToken'
          ? process.env.ACCESS_JWT_SECRET
          : process.env.REFRESH_JWT_SECRET,
      );
      const user = await this.userApiService.findUserById(decodedUserData.id);

      if (!user) {
        throw new Error();
      }

      tokenName === 'accessToken'
        ? (req.currentUser = user)
        : (req.userToRefreshTokens = user);
    } catch (err) {
      throw new HttpException(`invalid ${tokenName}`, HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
