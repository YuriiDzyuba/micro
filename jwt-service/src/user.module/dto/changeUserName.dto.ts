import { UserType } from '../types/user.type';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserNameDto implements Pick<UserType, 'userName'> {
  @ApiProperty({ example: 'jon', description: 'userName - should be unique' })
  @MinLength(2)
  @MaxLength(22)
  @IsNotEmpty()
  @IsString()
  userName: string;
}
