import { UserType } from './user.type';

export type CreateUserType = Pick<UserType, 'password' | 'userName' | 'email'>;
