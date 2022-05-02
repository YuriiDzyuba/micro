import { Inject, Injectable } from '@nestjs/common';
import {
  UserServiceInterface,
  UserApiServiceInterfaceToken,
} from '../contracts/user.module/interfaces/userService.interface';
import { UserNotExistException } from '../user.module/exceptions/userNotExist.exception';
import { AdminServiceInterface } from '../contracts/admin.module/interfaces/adminService.interface';
import { SafeUserType } from '../contracts/shared/safeUser.type';
import { UserType } from '../contracts/shared/user.type';

@Injectable()
export class AdminService implements AdminServiceInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
  ) {}

  async findUserById(userId: Pick<UserType, 'userId'>): Promise<SafeUserType> {
    return await this.userApiService.findUserById(userId);
  }

  async findUsers(): Promise<SafeUserType[]> {
    return await this.userApiService.findUsers();
  }

  async removeUser(userId: Pick<UserType, 'userId'>) {
    const foundedUser = await this.userApiService.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    await this.userApiService.removeUser(userId);
  }
}
