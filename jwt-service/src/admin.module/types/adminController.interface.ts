import { UserType } from '../../user.module/types/user.type';
import { OneUserResponseInterface } from './oneUserResponse.interface';
import { ManyUsersResponseInterface } from './manyUsersResponse.interface';
import { RemovedUserResponseInterface } from './removedUserResponse.interface';

export interface AdminControllerInterface {
  findUsers(): Promise<ManyUsersResponseInterface>;
  findUserById(id: Pick<UserType, 'userId'>): Promise<OneUserResponseInterface>;
  removeUser(
    id: Pick<UserType, 'userId'>,
  ): Promise<RemovedUserResponseInterface>;
}
