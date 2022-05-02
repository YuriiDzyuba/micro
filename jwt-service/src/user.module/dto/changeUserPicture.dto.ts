import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../../contracts/shared/user.type';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserPictureDto implements Pick<UserType, 'picture'> {
  @ApiProperty({
    example: 'http://aws-s3/images/avatar',
    description: 'picture - should be http address',
  })
  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  picture: string;
}
