import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CreateUserRequestType } from '../types/createUser.request.type';

export class CreateUserDto implements CreateUserRequestType {
  @ApiProperty({ example: 'pol14', description: 'nicName - should be unique' })
  @MinLength(2)
  @MaxLength(22)
  @IsNotEmpty()
  userName: string;

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
