import { UserType } from '../../user.module/types/user.type';

export type OAuthUserType = Pick<UserType, 'email' | 'userName' | 'picture'>;
