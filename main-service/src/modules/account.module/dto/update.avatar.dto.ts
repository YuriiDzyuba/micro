import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength} from "class-validator";
import {Avatar} from "../types/avatar.type";

export class UpdateAvatarDto implements Pick<Avatar, 'filter' | 'avatar' | 'url'> {
    @ApiProperty({ example: 'black', description: 'filter name', nullable: true })
    @MinLength(2)
    @MaxLength(128)
    filter: string | null;

    @ApiProperty({ example: 'picture file', description: 'should be empty' })
    avatar: string | null;

    @ApiProperty({ example: 'http?my-avatar/2312243', description: 'url to avatar' })
    @MinLength(6)
    @MaxLength(1024)
    url: string | null;
}
