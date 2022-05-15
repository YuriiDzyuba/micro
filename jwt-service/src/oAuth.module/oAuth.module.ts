import { Module } from '@nestjs/common';
import { OAuthService } from './oAuth.service';
import { OAuthController } from './oAuth.controller';
import { GoogleStrategy } from './google/google.strategy';
import { UserModule } from '../user.module/user.module';
import { OAuthServiceInterfaceToken } from './types/oAuthService.interface';

@Module({
  imports: [UserModule],
  controllers: [OAuthController],
  providers: [
    GoogleStrategy,
    {
      provide: OAuthServiceInterfaceToken,
      useClass: OAuthService,
    },
  ],
})
export class OAuthModule {}
