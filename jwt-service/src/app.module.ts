import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { UserModule } from './user.module/user.module';
import { mongoDbUrl } from './config/config';
import { AdminModule } from './admin.module/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.module/entity/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

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
    }
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
