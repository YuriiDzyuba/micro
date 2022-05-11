import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptoService } from './crypto.service';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { UserPresenter } from './user.presenter';
import { UserApiServiceInterfaceToken } from '../contracts/user.module/interfaces/userService.interface';
import { UserApiPresenterInterfaceToken } from '../contracts/user.module/interfaces/userPresenter.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { UserMappers } from './user.mappers';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EventsModule],
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
      provide: UserApiServiceInterfaceToken,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
