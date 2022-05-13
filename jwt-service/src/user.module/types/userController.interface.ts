import { UserResponseType } from './user.response.type';
import { UserType } from './user.type';

export interface UserControllerInterface {
  createUser(
    createUserDto: Pick<UserType, 'password' | 'email' | 'userName'>,
  ): Promise<UserResponseType>;
  logInUser(
    logInUserDto: Pick<UserType, 'password' | 'email'>,
  ): Promise<UserResponseType>;
  changeUserPicture(
    id: Pick<UserType, 'userId'>,
    updateUserPictureDto: Pick<UserType, 'picture'>,
  ): Promise<UserResponseType>;
  changeUserName(
    id: Pick<UserType, 'userId'>,
    updateUserNameDto: Pick<UserType, 'userName'>,
  ): Promise<UserResponseType>;
}
