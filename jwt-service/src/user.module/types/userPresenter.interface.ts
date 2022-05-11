import { UserResponseInterface } from './userResponse.interface';
import { SafeUserType } from './safeUser.type';

export interface UserPresenterInterface {
  buildUserResponse(user: SafeUserType): UserResponseInterface;
}

export const UserApiPresenterInterfaceToken = Symbol('UserPresenterInterface');
