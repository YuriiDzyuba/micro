import { UserType } from './user.type';

export type LoginUserType = Pick<UserType, 'password' | 'email'>;
