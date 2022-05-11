import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ChangeUserPictureDto } from './dto/changeUserPicture.dto';
import { UserControllerInterface } from './types/userController.interface';
import { UserResponseInterface } from './types/userResponse.interface';
import { ChangeUserNameDto } from './dto/changeUserName.dto';
import {
  UserServiceInterface,
  UserApiServiceInterfaceToken,
} from './types/userService.interface';
import {
  UserPresenterInterface,
  UserApiPresenterInterfaceToken,
} from './types/userPresenter.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserType } from './types/user.type';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {createNewUser, updateCurrentUser} from './consts/user.swagger.consts';

@ApiTags('user module')
@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UserController implements UserControllerInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
    @Inject(UserApiPresenterInterfaceToken)
    private userPresenter: UserPresenterInterface,
  ) {}

  // @ApiOperation(createNewUser.apiOperation)
  // @ApiResponse(createNewUser.apiResponse)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const createdUser = await this.userApiService.createUser(createUserDto);
    return this.userPresenter.buildUserResponse(createdUser);
  }

  // @ApiOperation(createNewUser.apiOperation)
  // @ApiResponse(createNewUser.apiResponse)
  @Post('login')
  async logInUser(
    @Body() logUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const logInnedUser = await this.userApiService.loginUser(logUserDto);
    return this.userPresenter.buildUserResponse(logInnedUser);
  }

  // @ApiOperation(updateCurrentUser.apiOperation)
  // @ApiResponse(updateCurrentUser.apiResponse)
  @Patch('picture/:userId')
  async changeUserPicture(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
    @Body() changeUserPictureDto: ChangeUserPictureDto,
  ): Promise<UserResponseInterface> {
    const userWithChangedPicture = await this.userApiService.changeUserPicture(
      userId,
      changeUserPictureDto,
    );
    return this.userPresenter.buildUserResponse(userWithChangedPicture);
  }

  @Patch('name/:userId')
  async changeUserName(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
    @Body() changeUserNameDto: ChangeUserNameDto,
  ): Promise<UserResponseInterface> {
    const userWithChangedName = await this.userApiService.changeUserName(
      userId,
      changeUserNameDto,
    );
    return this.userPresenter.buildUserResponse(userWithChangedName);
  }
}
