import {ApiProperty} from "@nestjs/swagger";
import {ManyUsersResponseInterface} from "../types/manyUsersResponse.interface";
import {SafeUserType} from "../../user.module/types/safeUser.type";

export class ManyUsersResponsePresentation implements ManyUsersResponseInterface {
  @ApiProperty({
    example: [
      {
        userId: '0695445d-d5b6-45b5-b58a-0c5852ab5821',
        userName: 'jon',
        email: 'jonDoe@gmail.de',
        verifiedEmail: false,
        roles: ['USER'],
        createdAt: 1652434085426,
        updatedAt: null,
      },
      {
        userId: '0695435d-d5b6-45b5-b58a-0c6852ab5821',
        userName: 'Sara',
        email: 'sara@gmail.de',
        verifiedEmail: true,
        roles: ['ADMIN'],
        createdAt: 1652434085416,
        updatedAt: null,
      },
    ],
    description: 'current user response',
  })
  users: SafeUserType[];
}
