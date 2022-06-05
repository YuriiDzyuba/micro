import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoService } from './crypto.service';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { UserPresenter } from './user.presenter';
import { UserApiServiceInterfaceToken } from './types/userService.interface';
import { UserApiPresenterInterfaceToken } from './types/userPresenter.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events.module/events.module';
import { UserMappers } from './user.mappers';
import { EmailVerification } from './entity/emailVerification.entity';
import { ConfigModule } from '@nestjs/config';
import config from './config/user.config';

@Module({
  imports: [
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([User, EmailVerification]),
    EventsModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserApiServiceInterfaceToken,
      useClass: UserService,
    },
    {
      provide: UserApiPresenterInterfaceToken,
      useClass: UserPresenter,
    },
    CryptoService,
    UserRepository,
    UserMappers,
  ],
  exports: [
    {
      provide: UserApiPresenterInterfaceToken,
      useClass: UserPresenter,
    },
    {
      provide: UserApiServiceInterfaceToken,
      useClass: UserService,
    },
    CryptoService,
  ],
})
export class UserModule {}
