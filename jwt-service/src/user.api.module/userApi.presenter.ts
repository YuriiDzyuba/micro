import { sign } from 'jsonwebtoken';
import { UserType } from '../contracts/shared/user.type';
import { UserResponseInterface } from '../contracts/user/interfaces/userResponse.interface';
import { Injectable } from '@nestjs/common';
import { UserApiPresenterInterface } from '../contracts/user/interfaces/userApiPresenter.interface';

@Injectable()
export class UserApiPresenter implements UserApiPresenterInterface {
  private generateToken(
    user: UserType,

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

  buildUserResponse(user: UserType): UserResponseInterface {
    return {
      user: {
        ...user,
        accessToken: this.generateToken(user),
        refreshToken: this.generateToken(user, 'refresh'),
      },
    };
  }
}
