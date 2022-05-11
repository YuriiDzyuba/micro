import {
  Controller,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AdminControllerInterface } from '../contracts/admin.module/interfaces/adminController.interface';
import {
  AdminServiceInterface,
  AdminApiServiceInterfaceToken,
} from '../contracts/admin.module/interfaces/adminService.interface';
import {
  AdminPresenterInterface,
  AdminApiPresenterInterfaceToken,
} from '../contracts/admin.module/interfaces/adminPresenter.interface';
import { OneUserResponseInterface } from '../contracts/admin.module/interfaces/oneUserResponse.interface';
import { ManyUsersResponseInterface } from '../contracts/admin.module/interfaces/manyUsersResponse.interface';
import { RemovedUserResponseInterface } from '../contracts/admin.module/interfaces/removedUserResponse.interface';
import { UserType } from '../contracts/shared/user.type';

@Controller('admin')
export class AdminController implements AdminControllerInterface {
  constructor(
    @Inject(AdminApiServiceInterfaceToken)
    private apiService: AdminServiceInterface,
    @Inject(AdminApiPresenterInterfaceToken)
    private adminPresenter: AdminPresenterInterface,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async findUsers(): Promise<ManyUsersResponseInterface> {
    const foundedUsers = await this.apiService.findUsers();
    return this.adminPresenter.buildManyUsersResponse(foundedUsers);
  }

  @Get(':userId')
  @UsePipes(new ValidationPipe())
  async findUserById(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
  ): Promise<OneUserResponseInterface> {
    const foundedUser = await this.apiService.findUserById(userId);
    return this.adminPresenter.buildOneUserResponse(foundedUser);
  }

  @Delete(':userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async removeUser(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
  ): Promise<RemovedUserResponseInterface> {
    await this.apiService.removeUser(userId);
    return this.adminPresenter.buildRemovedUserResponse(userId);
  }
}
