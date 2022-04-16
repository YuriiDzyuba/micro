import { UserResponseInterface } from './userResponse.interface';
import {SafeUserType} from "../../shared/safeUser.type";

export interface UserPresenterInterface {
  buildUserResponse(user: SafeUserType): UserResponseInterface;
}

export const UserApiPresenterInterfaceToken = Symbol(
  'UserPresenterInterface',
);
