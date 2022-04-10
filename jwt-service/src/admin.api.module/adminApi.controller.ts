import {
  Controller,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { FindUserByIdDto } from '../user.api.module/dto/findUserById.dto';
import { AdminApiControllerInterface } from '../contracts/admin/interfaces/adminApiController.interface';
import {
  AdminApiServiceInterface,
  AdminApiServiceInterfaceToken,
} from '../contracts/admin/interfaces/adminApiService.interface';
import {
  AdminApiPresenterInterface,
  AdminApiPresenterInterfaceToken,
} from '../contracts/admin/interfaces/adminApiPresenter.interface';
import { OneUserResponseInterface } from '../contracts/admin/interfaces/oneUserResponse.interface';
import { ManyUsersResponseInterface } from '../contracts/admin/interfaces/manyUsersResponse.interface';
import { RemovedUserResponseInterface } from '../contracts/admin/interfaces/removedUserResponse.interface';

@Controller('admin')
export class AdminApiController implements AdminApiControllerInterface {
  constructor(
    @Inject(AdminApiServiceInterfaceToken)
    private apiService: AdminApiServiceInterface,
    @Inject(AdminApiPresenterInterfaceToken)
    private adminPresenter: AdminApiPresenterInterface,
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
