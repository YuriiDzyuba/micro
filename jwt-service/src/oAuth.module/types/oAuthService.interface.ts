import { ExpressRequestInterface } from '../../types/expressRequest.interface';
import { SafeUserWithTokensType } from '../../user.module/types/safeUserWithTokens.type';
import { OAuthUserType } from './oAuthUser.type';

export interface OAuthServiceInterface {
  getSafeUserFromOAuth(
    request: ExpressRequestInterface,
  ): Promise<SafeUserWithTokensType>;
  createOAuthUser(candidate: OAuthUserType): Promise<SafeUserWithTokensType>;
}

export const OAuthServiceInterfaceToken = Symbol('OAuthServiceInterface');
