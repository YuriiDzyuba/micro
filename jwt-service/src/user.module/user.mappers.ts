import { User } from './entity/user.entity';
import { SafeUserType } from './types/safeUser.type';

export class UserMappers {
  mapUserEntityToSafeUser(user: User): SafeUserType {
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

  mapUserEntitiesToSafeUsers(users: User[]): SafeUserType[] {
    return users.map((user) => this.mapUserEntityToSafeUser(user));
  }
}
