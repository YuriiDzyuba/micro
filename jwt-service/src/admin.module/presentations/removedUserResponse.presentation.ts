import { ApiProperty } from "@nestjs/swagger";
import { RemovedUserResponseInterface } from "../types/removedUserResponse.interface";
import { UserType } from "../../user.module/types/user.type";

export class RemovedUserResponsePresentation implements RemovedUserResponseInterface {
  @ApiProperty({
    example: '0695445d-d5b6-45b5-b58a-0c5852ab5821',
    description: 'current user response',
  })
  removedUserId: Pick<UserType, "userId">;
}
