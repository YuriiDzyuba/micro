import { UserType } from '../../shared/user.type';

export interface OneUserResponseInterface {
  user: Omit<UserType, 'password'>;
}
