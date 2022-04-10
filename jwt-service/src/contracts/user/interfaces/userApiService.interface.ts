import { UserType } from '../../shared/user.type';

export interface UserApiServiceInterface {
  createUser(
    candidate: Pick<UserType, 'email' & 'password'>,
  ): Promise<UserType>;
  findUsers(): Promise<UserType[]>;
  findUserById(userId: Pick<UserType, 'userId'>): Promise<UserType>;
  changeUserPicture(
    userId: Pick<UserType, 'userId'>,
    userPicture: Pick<UserType, 'picture'>,
  ): Promise<UserType>;
  changeUserName(
    userId: Pick<UserType, 'userId'>,
    userName: Pick<UserType, 'userName'>,
  ): Promise<UserType>;
  removeUser(userId: Pick<UserType, 'userId'>): Promise<void>;
}

export const UserApiServiceInterfaceToken = Symbol('UserApiServiceInterface');
