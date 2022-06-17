import { CreateAccountDto } from './presenters/requestDto/create.account.dto';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountMapper } from './account.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly account: Repository<AccountEntity>,
    readonly accountMapper: AccountMapper,
  ) {}

  async findAccountByUserIdAndName(userId: string, name: string): Promise<AccountEntity> {
    const foundedAccount = await this.account.findOne({
      where: [
        { userId,  name},
      ]
    });
    return foundedAccount
      ? this.accountMapper.mapAccountEntityToAccount(foundedAccount)
      : null;
  }

  async createAccount(accountToSave: CreateAccountDto) {
    const newAccount = await this.account.save(accountToSave);
    return newAccount
      ? this.accountMapper.mapAccountEntityToAccount(newAccount)
      : null;
  }

  async findAllAccounts() {
    const foundedAccounts = await this.account.find();
    return foundedAccounts
      ? this.accountMapper.mapAccountEntitiesToAccounts(foundedAccounts)
      : [];
  }

  async findOneAccount(accountId: string) {
    const foundedAccount = await this.account.findOne(accountId);
    return foundedAccount
      ? this.accountMapper.mapAccountEntityToAccount(foundedAccount)
      : null;
  }

  async updateAccount(accountId: string, fieldsToUpdate) {
    const updatedAccount = await this.account.save({ accountId,  ...fieldsToUpdate});
    return updatedAccount
        ? this.accountMapper.mapAccountEntityToAccount(updatedAccount)
        : null;
  }

  async removeAccount(accountId: string): Promise<boolean> {
    const { affected } = await this.account.delete(accountId);
    return !!affected;
  }

  async updateAvatar(accountId: string, avatar: string): Promise<any> {
    const updatedAccount = await this.account.save({ accountId,  avatar });
    return updatedAccount
        ? this.accountMapper.mapAccountEntityToAccount(updatedAccount)
        : null;
  }
}
