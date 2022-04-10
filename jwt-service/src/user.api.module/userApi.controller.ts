import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { UserApiControllerInterface } from '../contracts/user/interfaces/userApiController.interface';
import { UserResponseInterface } from '../contracts/user/interfaces/userResponse.interface';
import { FindUserByIdDto } from './dto/findUserById.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import {
  UserApiServiceInterface,
  UserApiServiceInterfaceToken,
} from '../contracts/user/interfaces/userApiService.interface';
import {
  UserApiPresenterInterface,
  UserApiPresenterInterfaceToken,
} from '../contracts/user/interfaces/userApiPresenter.interface';

@Controller('user')
export class UserApiController implements UserApiControllerInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserApiServiceInterface,
    @Inject(UserApiPresenterInterfaceToken)
    private userPresenter: UserApiPresenterInterface,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const createdUser = await this.userApiService.createUser(createUserDto);
    return this.userPresenter.buildUserResponse(createdUser);
  }

  @Patch(':id/picture')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeUserPicture(
    @Param('id') id: FindUserByIdDto,
    @Body() changeUserPictureDto: ChangeUserPictureDto,
  ): Promise<UserResponseInterface> {
    const userWithChangedPicture = await this.userApiService.changeUserPicture(
      id,
      changeUserPictureDto,
    );
    return this.userPresenter.buildUserResponse(userWithChangedPicture);
  }

  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeUserName(
    @Param('id') id: FindUserByIdDto,
    @Body() changeUserNameDto: ChangeUserNameDto,
  ): Promise<UserResponseInterface> {
    const userWithChangedName = await this.userApiService.changeUserName(
      id,
      changeUserNameDto,
    );
    return this.userPresenter.buildUserResponse(userWithChangedName);
  }
}
