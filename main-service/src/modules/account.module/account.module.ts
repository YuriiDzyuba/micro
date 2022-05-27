import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountPresenter } from './account.presenter';
import { AccountMapper } from './account.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountRepository,
    AccountPresenter,
    AccountMapper,
  ],
})
export class AccountModule {}
