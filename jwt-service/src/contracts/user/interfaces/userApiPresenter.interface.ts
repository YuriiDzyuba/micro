import { UserResponseInterface } from './userResponse.interface';
import {SafeUserType} from "../../shared/safeUser.type";

export interface UserApiPresenterInterface {
  buildUserResponse(user: SafeUserType): UserResponseInterface;
}

export const UserApiPresenterInterfaceToken = Symbol(
  'UserApiPresenterInterface',
);
