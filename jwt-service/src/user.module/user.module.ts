import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from './password.service';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { UserPresenter } from './user.presenter';
import { UserApiServiceInterfaceToken } from '../contracts/user.module/interfaces/userService.interface';
import { UserApiPresenterInterfaceToken } from '../contracts/user.module/interfaces/userPresenter.interface';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
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
    PasswordService,
    UserRepository
  ],
  exports: [
    {
      provide: UserApiServiceInterfaceToken,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
