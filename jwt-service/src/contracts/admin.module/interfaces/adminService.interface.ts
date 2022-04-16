import { UserType } from '../../shared/user.type';

export interface AdminServiceInterface {
  findUsers(): Promise<UserType[]>;
  findUserById(id: Pick<UserType, 'userId'>): Promise<UserType>;
  removeUser(id: Pick<UserType, 'userId'>): Promise<void>;
}

export const AdminApiServiceInterfaceToken = Symbol('AdminServiceInterface');
