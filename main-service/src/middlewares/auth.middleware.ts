import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import {JwtPayload, verify} from 'jsonwebtoken';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { JwtToken } from "../types/jwtToken.type";
import { ConfigService } from "@nestjs/config";
import { Config } from 'src/types/config.type';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.currentUser = null;
      next();
      return;
    }

    const accessJwtSecret = this.configService.get(Config.accessJwtSecret)
    const tokenType: string = req.headers.authorization.split(' ')[0];
    const token: string = req.headers.authorization.split(' ')[1];

    if (tokenType !== JwtToken.ACCESS_TOKEN) {
      req.currentUser = null;
      next();
      return;
    }

    try {
      const decodedUserData = <JwtPayload>verify(token, JwtToken.ACCESS_TOKEN, accessJwtSecret);

      if (!decodedUserData.userId) throw new Error();

      req.currentUser = {
        userId: decodedUserData.userId,
        username: decodedUserData.username,
        email: decodedUserData.email
      }

    } catch (err) {
      throw new HttpException(`invalid ${tokenType}`, HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
