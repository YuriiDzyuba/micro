import { Request } from 'express';
import { SafeUserType } from '../user.module/types/safeUser.type';
import { OAuthUserType } from '../oAuth.module/types/oAuthUser.type';

export interface ExpressRequestInterface extends Request {
  currentUser?: SafeUserType;
  userToRefreshTokens?: SafeUserType;
  user?: OAuthUserType;
}
