import { Inject, Injectable } from '@nestjs/common';
import {
  UserServiceInterface,
  UserApiServiceInterfaceToken,
} from '../contracts/user.module/interfaces/userService.interface';
import { FindUserByIdDto } from '../user.module/dto/findUserById.dto';
import { UserNotExistException } from '../user.module/exceptions/userNotExist.exception';
import { AdminServiceInterface } from '../contracts/admin.module/interfaces/adminService.interface';
import { UserType } from '../contracts/shared/user.type';
import {SafeUserType} from "../contracts/shared/safeUser.type";

@Injectable()
export class AdminService implements AdminServiceInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
  ) {}

  async findUserById(id: FindUserByIdDto): Promise<UserType> {
    return await this.userApiService.findUserById(id);
  }

  async findUsers(): Promise<SafeUserType[]> {
    return await this.userApiService.findUsers();
  }

  async removeUser(userId: FindUserByIdDto) {
    const foundedUser = await this.userApiService.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    await this.userApiService.removeUser(userId);
  }
}
