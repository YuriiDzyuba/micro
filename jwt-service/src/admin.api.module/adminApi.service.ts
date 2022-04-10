import { Inject, Injectable } from '@nestjs/common';
import {
  UserApiServiceInterface,
  UserApiServiceInterfaceToken,
} from '../contracts/user/interfaces/userApiService.interface';
import { FindUserByIdDto } from '../user.api.module/dto/findUserById.dto';
import { UserNotExistException } from '../user.api.module/exceptions/userNotExist.exception';
import { AdminApiServiceInterface } from '../contracts/admin/interfaces/adminApiService.interface';
import { UserType } from '../contracts/shared/user.type';

@Injectable()
export class AdminApiService implements AdminApiServiceInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserApiServiceInterface,
  ) {}

  async findUserById(id: FindUserByIdDto): Promise<UserType> {
    return await this.userApiService.findUserById(id);
  }

  async findUsers(): Promise<UserType[]> {
    return await this.userApiService.findUsers();
  }

  async removeUser(userId: FindUserByIdDto) {
    const foundedUser = await this.userApiService.findUserById(userId);

    if (!foundedUser) throw new UserNotExistException();

    await this.userApiService.removeUser(userId);
  }
}
