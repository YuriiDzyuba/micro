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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createNewUser, logInUser, changeUserPicture, changeUserName } from './consts/user.swagger.consts';
import { UserResponsePresentation } from "./presentations/userResponse.presentation";

@ApiTags('user routes')
@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UserController implements UserControllerInterface {
  constructor(
    @Inject(UserApiServiceInterfaceToken)
    private userApiService: UserServiceInterface,
    @Inject(UserApiPresenterInterfaceToken)
    private userPresenter: UserPresenterInterface,
  ) {}

  @ApiOperation(createNewUser.apiOperation)
  @ApiResponse(createNewUser.apiResponse)
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponsePresentation> {
    const createdUser = await this.userApiService.createUser(createUserDto);
    return this.userPresenter.mapUserResponse(createdUser);
  }

  @ApiOperation(logInUser.apiOperation)
  @ApiResponse(logInUser.apiResponse)
  @ApiBearerAuth()
  @Post('login')
  async logInUser(
    @Body() logUserDto: LoginUserDto,
  ): Promise<UserResponsePresentation> {
    const logInnedUser = await this.userApiService.loginUser(logUserDto);
    return this.userPresenter.mapUserResponse(logInnedUser);
  }

  @ApiOperation(changeUserPicture.apiOperation)
  @ApiResponse(changeUserPicture.apiResponse)
  @ApiBearerAuth()
  @Patch('picture/:userId')
  async changeUserPicture(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
    @Body() changeUserPictureDto: ChangeUserPictureDto,
  ): Promise<UserResponsePresentation> {
    const userWithChangedPicture = await this.userApiService.changeUserPicture(
      userId,
      changeUserPictureDto,
    );
    return this.userPresenter.mapUserResponse(userWithChangedPicture);
  }

  @ApiOperation(changeUserName.apiOperation)
  @ApiResponse(changeUserName.apiResponse)
  @ApiBearerAuth()
  @Patch('name/:userId')
  async changeUserName(
    @Param('userId', new ParseUUIDPipe()) userId: Pick<UserType, 'userId'>,
    @Body() changeUserNameDto: ChangeUserNameDto,
  ): Promise<UserResponsePresentation> {
    const userWithChangedName = await this.userApiService.changeUserName(
      userId,
      changeUserNameDto,
    );
    return this.userPresenter.mapUserResponse(userWithChangedName);
  }
}
