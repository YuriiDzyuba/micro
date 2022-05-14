import { Injectable } from '@nestjs/common';
import { UserPresenterInterface } from './types/userPresenter.interface';
import { UserResponsePresentation } from './presentations/userResponse.presentation';
import { SafeUserWithTokensType } from './types/safeUserWithTokens.type';

@Injectable()
export class UserPresenter implements UserPresenterInterface {
  mapUserResponse(user: SafeUserWithTokensType): UserResponsePresentation {
    return {
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        picture: user.picture,
        verifiedEmail: user.verifiedEmail,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      },
    };
  }
}
