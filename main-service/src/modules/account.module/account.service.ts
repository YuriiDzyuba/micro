import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create.account.dto';
import { UpdateAccountDto } from './dto/update.account.dto';
import { AccountRepository } from './account.repository';
import { AccountEntity } from './entities/account.entity';
import { AccountExistsException } from "./exceptions/http.exceptions";

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  async createAccount(createAccount: CreateAccountDto) {

    const foundedAccount = await this.accountRepository.findAccountByUserIdAndName(createAccount.userId, createAccount.name)

    if (foundedAccount) throw new AccountExistsException()

    const emptyAccount = new AccountEntity();

    const newAccount = await this.accountRepository.createAccount({
      ...emptyAccount,
      ...createAccount,
    });
    return newAccount;
  }

  async findAllAccounts() {
    const foundedAccounts = await this.accountRepository.findAllAccounts();
    return foundedAccounts;
  }

  async findOneAccount(accountId: string) {
    const foundedAccount = await this.accountRepository.findOneAccount(
      accountId,
    );
    return foundedAccount;
  }

  async updateAccount(accountId: string, updateAccountDto: UpdateAccountDto) {
    const updatedAccount = await this.accountRepository.updateAccount(
      accountId,
      updateAccountDto,
    );
    return updatedAccount;
  }

  async removeAccount(accountId: string) {
    await this.accountRepository.removeAccount(accountId);
  }
}