import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../../types/role.enum";
import {Comment} from "../../../comment.module/types/comment.type";
import {Post} from "../../../post.module/types/post.type";


export class CreatedAccount {
    @ApiProperty({ example: '51316270-9535-4514-9332-2acdc6b74273', description: 'account primaryGeneratedColumn' })
    accountId: string;

    @ApiProperty({ example: '0b04ae15-7a95-4936-8afa-9ffd172819eb', description: 'bounded user id' })
    userId: string;

    @ApiProperty({ example: ' simply dummy text of the printing and typesetting ', description: 'bounded user id' })
    secondName: string;

    @ApiProperty({ example: 'http://aws-s3/dfdd-dfd-dfd.jpeg', description: 'link to image file' })
    avatar: string;

    @ApiProperty({ example: ' simply dummy text of the printing and typesetting industry. Lorem Ipsum has b  ', description: 'account description' })
    description: string;

    @ApiProperty({ example: 'STUDENT', description: 'account role ' })
    role: Role;

    @ApiProperty({ example: 'array of comments', description: 'an array of belonging comments' })
    comments: Comment[];

    @ApiProperty({ example: 'array of favorite comments', description: 'an array of favorite comments' })
    favoriteComments: Comment[];

    @ApiProperty({ example: 'array of posts', description: 'an array of belonging posts' })
    posts: Post[];

    @ApiProperty({ example: 'array of favorite posts', description: 'an array of favorite posts' })
    favoritePosts: Post[];

}

export class CreateAccountResponseDto {
    @ApiProperty({ type: () => CreatedAccount })
    account: CreatedAccount;
}