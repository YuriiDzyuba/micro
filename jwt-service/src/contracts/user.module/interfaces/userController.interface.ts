import { UserResponseInterface } from './userResponse.interface';
import { UserType } from '../../shared/user.type';

export interface UserControllerInterface {
  createUser(
    createUserDto: Pick<UserType, 'password' | 'email' | 'userName'>,
  ): Promise<UserResponseInterface>;
  logInUser(
    logInUserDto: Pick<UserType, 'password' | 'email'>,
  ): Promise<UserResponseInterface>;
  changeUserPicture(
    id: Pick<UserType, 'userId'>,
    updateUserPictureDto: Pick<UserType, 'picture'>,
  ): Promise<UserResponseInterface>;
  changeUserName(
    id: Pick<UserType, 'userId'>,
    updateUserNameDto: Pick<UserType, 'userName'>,
  ): Promise<UserResponseInterface>;
}
