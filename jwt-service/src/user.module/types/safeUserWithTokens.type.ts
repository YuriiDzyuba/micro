import { SafeUserType } from './safeUser.type';

export type SafeUserWithTokensType = SafeUserType & {
  accessToken: string;
  refreshToken: string;
};
