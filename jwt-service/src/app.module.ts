import {ClassSerializerInterceptor, Module, ValidationPipe} from '@nestjs/common';
import { UserModule } from './user.api.module/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDbUrl } from './config/config';
import { AdminModule } from './admin.api.module/admin.module';
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(mongoDbUrl, {
      useNewUrlParser: true,
    }),
    AdminModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({transform: true})
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
