import { UserResponseType } from "../types/user.response.type";
import { ApiProperty } from "@nestjs/swagger";
import { SafeUserWithTokensType } from "../types/safeUserWithTokens.type";

export class UserResponsePresentation implements UserResponseType {
    @ApiProperty({ example: {
        userId: "0695445d-d5b6-45b5-b58a-0c5852ab5821",
            userName: "jon",
            email: "jonDoe@gmail.de",
            verifiedEmail: false,
            roles: [
                "USER"
            ],
            createdAt: 1652434085426,
            updatedAt: null,
            accessToken: "eyJhbGciOiJIhhLTBjNCIsIIjoxNjUyNDQxMjTuL1LFr5MxdH0tB-9DFc",
            refreshToken: "eyJhbGciOiJIUztNDViNS1iNThhLTBjNTeWRnMjHTp4_oUnShiH9Zk",
        },
        description: "current user response"})
    user: SafeUserWithTokensType
}