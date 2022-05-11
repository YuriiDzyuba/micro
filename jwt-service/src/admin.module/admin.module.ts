import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user.module/user.module';
import { AdminApiServiceInterfaceToken } from './types/adminService.interface';
import { AdminApiPresenterInterfaceToken } from './types/adminPresenter.interface';
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
