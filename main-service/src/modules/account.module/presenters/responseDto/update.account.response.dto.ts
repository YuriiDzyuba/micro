import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreatedAccount} from "./create.account.response.dto";
import {Post} from "../../../post.module/types/post.type";


class UpdatedAccount extends PartialType(CreatedAccount){
    @ApiProperty({ example: 'array dfsdfsdfdsf of favorite posts', description: 'an array of favorite posts' })
    favoritePocscxts: Post[];
}

export class UpdateAccountResponseDto {
    @ApiProperty({ type: () => UpdatedAccount })
    account: UpdatedAccount;
}