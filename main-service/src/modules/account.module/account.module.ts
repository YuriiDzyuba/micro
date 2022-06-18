import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountPresenter } from './presenters/account.presenter';
import { AccountMapper } from './account.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        }
      },
    ])
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountRepository,
    AccountPresenter,
    AccountMapper,
  ],
})
export class AccountModule {}
