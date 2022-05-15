import { ApiProperty } from '@nestjs/swagger';
import { ManyUsersResponseInterface } from '../types/manyUsersResponse.interface';
import { SafeUserType } from '../../user.module/types/safeUser.type';
import { OneUserResponseInterface } from '../types/oneUserResponse.interface';

export class OneUserResponsePresentation implements OneUserResponseInterface {
  @ApiProperty({
    example: {
      userId: '0695445d-d5b6-45b5-b58a-0c5852ab5821',
      userName: 'jon',
      email: 'jonDoe@gmail.de',
      verifiedEmail: false,
      roles: ['USER'],
      createdAt: 1652434085426,
      updatedAt: null,
    },
    description: 'current user response',
  })
  user: SafeUserType;
}
