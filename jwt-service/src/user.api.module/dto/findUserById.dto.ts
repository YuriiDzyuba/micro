import { IsUUID } from 'class-validator';
import { UserType } from '../../contracts/shared/user.type';

export class FindUserByIdDto implements Pick<UserType, 'userId'> {
  @IsUUID()
  readonly userId: string;
}
