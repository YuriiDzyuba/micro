import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from '../contracts/user.module/interfaces/userResponse.interface';
import { Injectable } from '@nestjs/common';
import { UserPresenterInterface } from '../contracts/user.module/interfaces/userPresenter.interface';
import { SafeUserType } from "../contracts/shared/safeUser.type";

@Injectable()
export class UserApiPresenter implements UserPresenterInterface {
  private generateToken(
    user: SafeUserType,

    tokenType = 'access',
  ): string {
    return sign(
      {
        id: user.userId,
        username: user.userName,
        email: user.email,
      },
      tokenType === 'refresh'
        ? process.env.REFRESH_JWT_SECRET
        : process.env.ACCESS_JWT_SECRET,
      {
        expiresIn:
          tokenType === 'refresh'
            ? process.env.REFRESH_TOKEN_EXP_IN
            : process.env.ACCESS_TOKEN_EXP_IN,
      },
    );
  }

  buildUserResponse(user: SafeUserType): UserResponseInterface {
    return {
      user: {
        ...user,
        accessToken: this.generateToken(user),
        refreshToken: this.generateToken(user, 'refresh'),
      },
    };
  }
}
