import { UserType } from './user.type';
import { SafeUserType } from './safeUser.type';

export interface UserServiceInterface {
  createUser(
    candidate: Pick<UserType, 'password' | 'userName' | 'email'>,
  ): Promise<SafeUserType>;
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
