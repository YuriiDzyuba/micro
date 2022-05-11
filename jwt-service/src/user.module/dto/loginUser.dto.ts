import { UserType } from '../../contracts/shared/user.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto implements Pick<UserType, 'password' | 'email'> {
  @ApiProperty({ example: 'sdQd3gD', description: 'user password' })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  password: string;

  @ApiProperty({ example: 'pol@mail.de', description: 'user email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
