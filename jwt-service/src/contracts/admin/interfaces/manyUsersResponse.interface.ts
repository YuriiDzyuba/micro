import { UserType } from '../../shared/user.type';

export interface ManyUsersResponseInterface {
  users: Omit<UserType, 'password'>[];
}
