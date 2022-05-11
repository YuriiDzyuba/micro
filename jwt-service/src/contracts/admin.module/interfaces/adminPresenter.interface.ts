import { UserType } from '../../shared/user.type';
import { OneUserResponseInterface } from './oneUserResponse.interface';
import { ManyUsersResponseInterface } from './manyUsersResponse.interface';
import { RemovedUserResponseInterface } from './removedUserResponse.interface';
import { SafeUserType } from '../../shared/safeUser.type';

export interface AdminPresenterInterface {
  buildOneUserResponse(user: SafeUserType): OneUserResponseInterface;
  buildManyUsersResponse(user: SafeUserType[]): ManyUsersResponseInterface;
  buildRemovedUserResponse(
    id: Pick<UserType, 'userId'>,
  ): RemovedUserResponseInterface;
}

export const AdminApiPresenterInterfaceToken = Symbol(
  'AdminPresenterInterface',
);
