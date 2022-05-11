import { UserType } from '../../user.module/types/user.type';
import { SafeUserType } from '../../user.module/types/safeUser.type';

export interface AdminServiceInterface {
  findUsers(): Promise<SafeUserType[]>;
  findUserById(userId: Pick<UserType, 'userId'>): Promise<SafeUserType>;
  removeUser(userId: Pick<UserType, 'userId'>): Promise<void>;
}

export const AdminApiServiceInterfaceToken = Symbol('AdminServiceInterface');
