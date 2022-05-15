import { Inject, Injectable } from '@nestjs/common';
import {
  UserApiServiceInterfaceToken,
  UserServiceInterface,
} from '../user.module/types/userService.interface';
import { OAuthUserType } from './types/oAuthUser.type';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { SafeUserWithTokensType } from '../user.module/types/safeUserWithTokens.type';
import { CantLoginUserException } from './oAuth.exceptions';
import { OAuthServiceInterface } from './types/oAuthService.interface';

@Injectable()
export class OAuthService implements OAuthServiceInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    public userService: UserServiceInterface,
  ) {}

  async getSafeUserFromOAuth(
    request: ExpressRequestInterface,
  ): Promise<SafeUserWithTokensType> {
    if (!request.user) throw new CantLoginUserException();

    const candidate: OAuthUserType = request.user;
    const foundedUser = await this.userService.getSafeUserByEmail(
      candidate.email,
    );

    if (foundedUser) return this.userService.getCurrentUser(foundedUser);

    return await this.createOAuthUser(candidate);
  }

  async createOAuthUser(
    candidate: OAuthUserType,
  ): Promise<SafeUserWithTokensType> {
    return this.userService.createOAuthUser(candidate);
  }
}
