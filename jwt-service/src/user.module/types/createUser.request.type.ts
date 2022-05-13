import { UserType } from './user.type';

export type CreateUserRequestType = Pick<UserType, 'password' | 'userName' | 'email'>;
