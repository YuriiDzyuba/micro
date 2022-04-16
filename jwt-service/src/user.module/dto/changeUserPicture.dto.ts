import { IsString } from 'class-validator';
import { UserType } from '../../contracts/shared/user.type';

export class ChangeUserPictureDto implements Pick<UserType, 'picture'> {
  @IsString()
  picture: string;
}
