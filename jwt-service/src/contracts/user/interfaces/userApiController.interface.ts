import { UserResponseInterface } from './userResponse.interface';
import { CreateUserDto } from '../../../user.api.module/dto/createUser.dto';
import { UserType } from '../../shared/user.type';

export interface UserApiControllerInterface {
  createUser(createUserDto: CreateUserDto): Promise<UserResponseInterface>;
  changeUserPicture(
    id: Pick<UserType, 'userId'>,
    updateUserPictureDto: Pick<UserType, 'picture'>,
  ): Promise<UserResponseInterface>;
  changeUserName(
    id: Pick<UserType, 'userId'>,
    updateUserNameDto: Pick<UserType, 'userName'>,
  ): Promise<UserResponseInterface>;
}
