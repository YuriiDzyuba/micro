import { UserType } from '../../user.module/types/user.type';

export interface RemovedUserResponseInterface {
  removedUserId: Pick<UserType, 'userId'>;
}
