import { UserResponseInterface } from './types/userResponse.interface';
import { Injectable } from '@nestjs/common';
import { UserPresenterInterface } from './types/userPresenter.interface';
import { SafeUserType } from './types/safeUser.type';
import { CryptoService } from './crypto.service';

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
