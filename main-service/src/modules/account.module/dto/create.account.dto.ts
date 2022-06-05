import { Account } from '../types/account.type';
import { Role } from '../types/role.enum';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto
  implements
    Pick<Account, 'userId' | 'name' | 'title' | 'description' | 'role'>
{
  @ApiProperty({
    example: '51316270-9535-4514-9332-2acdc6b74273',
    description: 'userId - uuid ',
  })
  @MinLength(36)
  @MaxLength(36)
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'Pol', description: 'account name' })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'My new account', description: 'account title' })
  @MinLength(2)
  @MaxLength(128)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'description longer than or equal to 16 characters', description: 'account description' })
  @MinLength(16)
  @MaxLength(1024)
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'TEACHER', description: 'account mentor' })
  @MinLength(2)
  @MaxLength(12)
  @IsNotEmpty()
  role: Role;
}
