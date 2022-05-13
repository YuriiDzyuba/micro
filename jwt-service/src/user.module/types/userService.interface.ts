import { UserType } from './user.type';
import { SafeUserType } from './safeUser.type';
import { CreateUserRequestType } from "./createUser.request.type";
import { SafeUserWithTokensType } from "./safeUserWithTokens.type";

export interface UserServiceInterface {
  createUser(
    candidate: CreateUserRequestType,
  ): Promise<SafeUserWithTokensType>;
  loginUser(
    candidate: Pick<UserType, 'email' | 'password'>,
  ): Promise<SafeUserType>;
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
}

export const UserApiServiceInterfaceToken = Symbol('UserServiceInterface');
