import { UserType } from './user.type';
import { SafeUserType } from './safeUser.type';
import { SafeUserWithTokensType } from './safeUserWithTokens.type';
import { LoginUserType } from './loginUser.type';
import { OAuthUserType } from '../../oAuth.module/types/oAuthUser.type';
import { CreateUserType } from './createUser.type';

export interface UserServiceInterface {
  getSafeUserByEmail(email: string): Promise<SafeUserType>;
  createOAuthUser(candidate: OAuthUserType): Promise<SafeUserWithTokensType>;
  getCurrentUser(safeUser: SafeUserType): SafeUserWithTokensType;
  createUser(candidate: CreateUserType): Promise<SafeUserWithTokensType>;
  loginUser(candidate: LoginUserType): Promise<SafeUserType>;
  findUsers(): Promise<SafeUserType[]>;
  findUserById(userId: Pick<UserType, 'userId'>): Promise<SafeUserType>;
  changeUserPicture(
    userId: Pick<UserType, 'userId'>,
    userPicture: Pick<UserType, 'picture'>,
  ): Promise<SafeUserType>;
  changeUserName(
    userId: Pick<UserType, 'userId'>,
    userName: Pick<UserType, 'userName'>,
  ): Promise<SafeUserType>;
  removeUser(userId: Pick<UserType, 'userId'>): Promise<void>;
  verifyEmail(activationLink: string): Promise<boolean>;
}

export const UserApiServiceInterfaceToken = Symbol('UserServiceInterface');
