import {
  Controller,
  Get,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Inject,
  ParseUUIDPipe, HttpCode,
} from '@nestjs/common';
import { AdminControllerInterface } from './types/adminController.interface';
import {
  AdminServiceInterface,
  AdminApiServiceInterfaceToken,
} from './types/adminService.interface';
import {
  AdminPresenterInterface,
  AdminApiPresenterInterfaceToken,
} from './types/adminPresenter.interface';
import { UserType } from '../user.module/types/user.type';
import { Roles } from "../decorators/roles.decorator";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UserRoleEnum } from "../types/userRole.enum";
import {findUserById, findUsers, deleteUserById } from './consts/admin.swagger.consts';
import {ManyUsersResponsePresentation} from "./presentations/manyUsersResponse.presentation";
import {OneUserResponsePresentation} from "./presentations/oneUserResponse.presentation";
import {RemovedUserResponsePresentation} from "./presentations/removedUserResponse.presentation";

@ApiTags('admin routes')
@ApiBearerAuth()
@Roles(UserRoleEnum.ADMIN)
@Controller('admin')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AdminController implements AdminControllerInterface {
  constructor(
    @Inject(AdminApiServiceInterfaceToken)
    private apiService: AdminServiceInterface,
    @Inject(AdminApiPresenterInterfaceToken)
    private adminPresenter: AdminPresenterInterface,
  ) {}

  @ApiOperation(findUsers.apiOperation)
  @ApiResponse(findUsers.apiResponse)
  @Get('find_users')
  async findUsers(): Promise<ManyUsersResponsePresentation> {
    const foundedUsers = await this.apiService.findUsers();
    return this.adminPresenter.buildManyUsersResponse(foundedUsers);
  }

  @ApiOperation(findUserById.apiOperation)
  @ApiResponse(findUserById.apiResponse)
  @Get('find_user/:userId')
  async findUserById(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
  ): Promise<OneUserResponsePresentation> {
    const foundedUser = await this.apiService.findUserById(userId);
    return this.adminPresenter.buildOneUserResponse(foundedUser);
  }

  @ApiOperation(deleteUserById.apiOperation)
  @ApiResponse(deleteUserById.apiResponse)
  @HttpCode(202)
  @Delete('delete_user/:userId')
  async removeUser(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
  ): Promise<RemovedUserResponsePresentation> {
    await this.apiService.removeUser(userId);
    return this.adminPresenter.buildRemovedUserResponse(userId);
  }
}
