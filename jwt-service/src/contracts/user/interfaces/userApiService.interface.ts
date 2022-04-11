import { UserType } from '../../shared/user.type';
import {SafeUserType} from "../../shared/safeUser.type";

export interface UserApiServiceInterface {
  createUser(
    candidate: Pick<UserType, 'email' & 'password'>,
  ): Promise<SafeUserType>;
  findUsers(): Promise<UserType[]>;
  findUserById(userId: Pick<UserType, 'userId'>): Promise<UserType>;
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

export const UserApiServiceInterfaceToken = Symbol('UserApiServiceInterface');
