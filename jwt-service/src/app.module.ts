import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { UserModule } from './user.module/user.module';
import { mongoDbUrl } from './config/config';
import { AdminModule } from './admin.module/admin.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.module/entity/user.entity";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      entities: [User],
      type: 'mongodb',
      url: mongoDbUrl,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    AdminModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
