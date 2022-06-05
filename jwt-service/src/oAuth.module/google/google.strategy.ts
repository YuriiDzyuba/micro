import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly googleClientId;
  private readonly hostDomain;
  private readonly hostDomainGlobalPrefix;
  private readonly googleClientSecret;
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('googleClientId'),
      clientSecret: configService.get<string>('googleClientSecret'),
      callbackURL: `${configService.get<string>(
        'hostDomain',
      )}${configService.get<string>(
        'hostDomainGlobalPrefix',
      )}/o_auth/google_redirect`,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      userName: name.givenName + name.familyName,
      picture: photos[0].value,
    };
    done(null, user);
  }
}
