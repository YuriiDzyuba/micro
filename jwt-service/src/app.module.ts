import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { UserModule } from './user.module/user.module';
import { AdminModule } from './admin.module/admin.module';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events.module/events.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { OAuthModule } from './oAuth.module/oAuth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User} from "./user.module/entity/user.entity";
import { EmailVerification} from "./user.module/entity/emailVerification.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './env' }),
    UserModule,
    EventsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'mongodb'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        database: config.get<string>('TYPEORM_DATABASE'),
        entities: [User, EmailVerification],
        synchronize: true,
        logging: false,
      }),
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
