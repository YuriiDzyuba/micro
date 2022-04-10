import { UserType } from '../../shared/user.type';

export interface RemovedUserResponseInterface {
  removedUserId: Pick<UserType, 'userId'>;
}
