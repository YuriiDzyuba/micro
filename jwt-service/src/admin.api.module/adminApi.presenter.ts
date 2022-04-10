import { ManyUsersResponseInterface } from '../contracts/admin/interfaces/manyUsersResponse.interface';
import { AdminApiPresenterInterface } from '../contracts/admin/interfaces/adminApiPresenter.interface';
import { UserType } from '../contracts/shared/user.type';
import { OneUserResponseInterface } from '../contracts/admin/interfaces/oneUserResponse.interface';
import { RemovedUserResponseInterface } from '../contracts/admin/interfaces/removedUserResponse.interface';

export class AdminApiPresenter implements AdminApiPresenterInterface {
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
