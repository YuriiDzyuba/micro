import { UserType } from './user.type';

export interface UserResponseInterface {
  user: Omit<UserType, 'password'> & {
    accessToken: string;
    refreshToken: string;
  };
}
