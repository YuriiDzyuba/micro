import { SafeUserType } from './types/safeUser.type';
import { UserType } from './types/user.type';

export class UserMappers {
  mapUserEntityToSafeUser(user: UserType): SafeUserType {
    return {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      verifiedEmail: user.verifiedEmail,
      picture: user.picture,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  mapUserEntitiesToSafeUsers(users: UserType[]): SafeUserType[] {
    return users.map((user) => this.mapUserEntityToSafeUser(user));
  }
}
