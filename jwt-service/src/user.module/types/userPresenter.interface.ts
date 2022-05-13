import { UserResponseType } from './user.response.type';
import { SafeUserType } from './safeUser.type';

export interface UserPresenterInterface {
  mapUserResponse(user: SafeUserType): UserResponseType;
}

export const UserApiPresenterInterfaceToken = Symbol('UserPresenterInterface');
``