import { UserResponseInterface } from './userResponse.interface';
import { UserType } from '../../shared/user.type';

export interface UserApiPresenterInterface {
  buildUserResponse(user: UserType): UserResponseInterface;
}

export const UserApiPresenterInterfaceToken = Symbol(
  'UserApiPresenterInterface',
);
