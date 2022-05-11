import { ManyUsersResponseInterface } from './types/manyUsersResponse.interface';
import { AdminPresenterInterface } from './types/adminPresenter.interface';
import { UserType } from '../user.module/types/user.type';
import { OneUserResponseInterface } from './types/oneUserResponse.interface';
import { RemovedUserResponseInterface } from './types/removedUserResponse.interface';

export class AdminPresenter implements AdminPresenterInterface {
  buildManyUsersResponse(users: UserType[]): ManyUsersResponseInterface {
    return { users };
  }

  buildOneUserResponse(user: UserType): OneUserResponseInterface {
    return { user };
  }

  buildRemovedUserResponse(
    id: Pick<UserType, 'userId'>,
  ): RemovedUserResponseInterface {
    return { removedUserId: id };
  }
}
