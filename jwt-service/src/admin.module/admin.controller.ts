import {
  Controller,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { FindUserByIdDto } from '../user.module/dto/findUserById.dto';
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
    return this.adminPresenter.buildManyUserResponse(foundedUsers);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async findUserById(
    @Param('id') id: FindUserByIdDto,
  ): Promise<OneUserResponseInterface> {
    const foundedUser = await this.apiService.findUserById(id);
    return this.adminPresenter.buildOneUserResponse(foundedUser);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async removeUser(
    @Param('id') id: FindUserByIdDto,
  ): Promise<RemovedUserResponseInterface> {
    await this.apiService.removeUser(id);
    return this.adminPresenter.buildRemovedUserResponse(id);
  }
}
