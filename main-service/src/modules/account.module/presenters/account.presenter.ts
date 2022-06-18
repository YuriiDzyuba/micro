import { Injectable } from '@nestjs/common';
import { AccountEntity } from "../entities/account.entity";
import { CreateAccountResponseDto } from "./responseDto/create.account.response.dto";

@Injectable()
export class AccountPresenter {
  mapAccountResponse(account:AccountEntity): CreateAccountResponseDto {
    return { account: {
        accountId:account.accountId,
        userId:account.userId,
        secondName:account.name + account.title,
        avatar:account.avatar,
        description:account.description,
        role:account.role,
        comments:account.comments,
        favoriteComments:account.favoriteComments,
        posts:account.posts,
        favoritePosts:account.favoritePosts
      }
    };
  }

  mapMenuAccountResponse(accounts) {
    return { accounts };
  }
}
