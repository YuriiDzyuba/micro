import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user.module/user.module';
import { AdminApiServiceInterfaceToken } from '../contracts/admin.module/interfaces/adminService.interface';
import { AdminApiPresenterInterfaceToken } from '../contracts/admin.module/interfaces/adminPresenter.interface';
import { AdminPresenter } from './admin.presenter';

@Module({
  imports: [UserModule],
  controllers: [AdminController],
  providers: [
    {
      provide: AdminApiServiceInterfaceToken,
      useClass: AdminService,
    },
    {
      provide: AdminApiPresenterInterfaceToken,
      useClass: AdminPresenter,
    },
  ],
})
export class AdminModule {}
