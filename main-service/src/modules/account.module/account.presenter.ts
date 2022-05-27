import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountPresenter {
  mapAccountResponse(account) {
    return { account };
  }

  mapMenuAccountResponse(accounts) {
    return { accounts };
  }
}
