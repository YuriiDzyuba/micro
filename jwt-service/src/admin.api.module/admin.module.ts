import { Module } from '@nestjs/common';
import { AdminApiService } from './adminApi.service';
import { AdminApiController } from './adminApi.controller';
import { UserModule } from '../user.api.module/user.module';
import { AdminApiServiceInterfaceToken } from '../contracts/admin/interfaces/adminApiService.interface';
import { AdminApiPresenterInterfaceToken } from '../contracts/admin/interfaces/adminApiPresenter.interface';
import { AdminApiPresenter } from './adminApi.presenter';

@Module({
  imports: [UserModule],
  controllers: [AdminApiController],
  providers: [
    {
      provide: AdminApiServiceInterfaceToken,
      useClass: AdminApiService,
    },
    {
      provide: AdminApiPresenterInterfaceToken,
      useClass: AdminApiPresenter,
    },
  ],
})
export class AdminModule {}
