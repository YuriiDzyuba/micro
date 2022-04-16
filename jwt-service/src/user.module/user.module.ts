import { Module } from '@nestjs/common';
import { UserApiService } from './userApi.service';
import { UserApiController } from './userApi.controller';
import { PasswordService } from './password.service';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { UserApiPresenter } from './userApi.presenter';
import { UserApiServiceInterfaceToken } from '../contracts/user/interfaces/userApiService.interface';
import { UserApiPresenterInterfaceToken } from '../contracts/user/interfaces/userApiPresenter.interface';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserApiController],
  providers: [
    {
      provide: UserApiServiceInterfaceToken,
      useClass: UserApiService,
    },
    {
      provide: UserApiPresenterInterfaceToken,
      useClass: UserApiPresenter,
    },
    PasswordService,
    UserRepository,
  ],
  exports: [
    {
      provide: UserApiServiceInterfaceToken,
      useClass: UserApiService,
    },
  ],
})
export class UserModule {}
