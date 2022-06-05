import { Account } from '../types/account.type';
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export class UpdateAccountDto implements Pick<Account, 'name' | 'title' | 'description'> {
    @ApiProperty({ example: 'Pol', description: 'account name' })
    @MinLength(2)
    @MaxLength(32)
    name: string | null;

    @ApiProperty({ example: 'My new account', description: 'account title' })
    @MinLength(2)
    @MaxLength(128)
    title: string | null;

    @ApiProperty({ example: 'description longer than or equal to 16 characters', description: 'account description' })
    @MinLength(16)
    @MaxLength(1024)
    description: string | null;
}
