import { Inject, Injectable } from '@nestjs/common';
import {
  UserServiceInterface,
  UserApiServiceInterfaceToken,
} from '../user.module/types/userService.interface';
import { UserExceptions } from '../user.module/user.exceptions';
import { AdminServiceInterface } from './types/adminService.interface';
import { SafeUserType } from '../user.module/types/safeUser.type';
import { UserType } from '../user.module/types/user.type';

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

    if (!foundedUser) throw new UserExceptions();

    await this.userApiService.removeUser(userId);
  }
}
