import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
import {
  googleClientId,
  hostDomain,
  hostDomainGlobalPrefix,
  googleClientSecret,
} from '../../config/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${hostDomain}${hostDomainGlobalPrefix}/o_auth/google_redirect`,
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
