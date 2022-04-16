import { UserType } from '../../contracts/shared/user.type';
import { IsString } from 'class-validator';

export class ChangeUserNameDto implements Pick<UserType, 'userName'> {
  @IsString()
  userName: string;
}
