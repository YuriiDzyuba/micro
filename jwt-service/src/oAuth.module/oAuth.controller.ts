import { Controller, Get, UseGuards, Req, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  OAuthServiceInterface,
  OAuthServiceInterfaceToken,
} from './types/oAuthService.interface';
import {
  UserApiPresenterInterfaceToken,
  UserPresenterInterface,
} from '../user.module/types/userPresenter.interface';

@ApiTags('oAuth routes')
@Controller('o_auth')
export class OAuthController {
  constructor(
    @Inject(OAuthServiceInterfaceToken)
    private oAuthService: OAuthServiceInterface,
    @Inject(UserApiPresenterInterfaceToken)
    private userPresenter: UserPresenterInterface,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google_redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const logInnedUser = await this.oAuthService.getSafeUserFromOAuth(req);
    return this.userPresenter.mapUserResponse(logInnedUser);
  }
}
