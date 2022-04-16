import { UserType } from '../../shared/user.type';
import { OneUserResponseInterface } from './oneUserResponse.interface';
import { ManyUsersResponseInterface } from './manyUsersResponse.interface';
import { RemovedUserResponseInterface } from './removedUserResponse.interface';

export interface AdminPresenterInterface {
  buildOneUserResponse(user: UserType): OneUserResponseInterface;
  buildManyUserResponse(user: UserType[]): ManyUsersResponseInterface;
  buildRemovedUserResponse(id: Pick<UserType, 'userId'>): RemovedUserResponseInterface;
}

export const AdminApiPresenterInterfaceToken = Symbol(
  'AdminPresenterInterface',
);
