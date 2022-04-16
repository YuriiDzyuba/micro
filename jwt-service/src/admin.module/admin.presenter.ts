import { ManyUsersResponseInterface } from '../contracts/admin.module/interfaces/manyUsersResponse.interface';
import { AdminPresenterInterface } from '../contracts/admin.module/interfaces/adminPresenter.interface';
import { UserType } from '../contracts/shared/user.type';
import { OneUserResponseInterface } from '../contracts/admin.module/interfaces/oneUserResponse.interface';
import { RemovedUserResponseInterface } from '../contracts/admin.module/interfaces/removedUserResponse.interface';

export class AdminApiPresenter implements AdminPresenterInterface {
  buildManyUserResponse(users: UserType[]): ManyUsersResponseInterface {
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
