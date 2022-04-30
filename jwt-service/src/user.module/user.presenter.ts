import { UserResponseInterface } from '../contracts/user.module/interfaces/userResponse.interface';
import { Injectable } from '@nestjs/common';
import { UserPresenterInterface } from '../contracts/user.module/interfaces/userPresenter.interface';
import { SafeUserType } from "../contracts/shared/safeUser.type";
import { CryptoService } from "./crypto.service";

@Injectable()
export class UserPresenter implements UserPresenterInterface {
  constructor(private readonly cryptoService: CryptoService) {}

  buildUserResponse(user: SafeUserType): UserResponseInterface {
    return {
      user: {
        ...user,
        accessToken: this.cryptoService.generateToken(user),
        refreshToken: this.cryptoService.generateToken(user, 'refresh'),
      },
    };
  }
}
