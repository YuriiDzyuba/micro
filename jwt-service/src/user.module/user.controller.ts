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
import { UserControllerInterface } from '../contracts/user.module/interfaces/userController.interface';
import { UserResponseInterface } from '../contracts/user.module/interfaces/userResponse.interface';
import { FindUserByIdDto } from './dto/findUserById.dto';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import {
  UserServiceInterface,
  UserApiServiceInterfaceToken,
} from '../contracts/user.module/interfaces/userService.interface';
import {
  UserPresenterInterface,
  UserApiPresenterInterfaceToken,
} from '../contracts/user.module/interfaces/userPresenter.interface';
import {LoginUserDto} from "./dto/loginUser.dto";

@Controller('user')
export class UserController implements UserControllerInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
    @Inject(UserApiPresenterInterfaceToken)
    private userPresenter: UserPresenterInterface,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const createdUser = await this.userApiService.createUser(createUserDto);
    return this.userPresenter.buildUserResponse(createdUser);
  }

  @Post('login')
  async logInUser(
    @Body() logUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const logInnedUser = await this.userApiService.loginUser(logUserDto);
    return this.userPresenter.buildUserResponse(logInnedUser);
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
