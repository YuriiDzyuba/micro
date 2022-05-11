import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.module/user.service';
import { ExpressRequestInterface } from "../contracts/shared/expressRequest.interface";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
      private readonly userService: UserService
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
      const user = await this.userService.findUserById(decodedUserData.id);

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
