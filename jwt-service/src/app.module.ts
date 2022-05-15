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
import { EventsModule } from './events.module/events.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { EmailVerification } from './user.module/entity/emailVerification.entity';
import { OAuthModule } from './oAuth.module/oAuth.module';

@Module({
  imports: [
    UserModule,
    EventsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      entities: [User, EmailVerification],
      type: 'mongodb',
      url: mongoDbUrl,
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    AdminModule,
    OAuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
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
