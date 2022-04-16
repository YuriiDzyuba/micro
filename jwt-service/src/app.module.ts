import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { UserModule } from './user.module/user.module';
import { mongoDbUrl} from './config/config';
import { AdminModule } from './admin.module/admin.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./user.module/entity/user.entity";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    UserModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      entities: [User],
      type: 'mongodb',
      url: mongoDbUrl,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    AdminModule,
    EventsModule,
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
