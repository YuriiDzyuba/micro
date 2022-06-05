import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from './configs/event.config';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(config),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'MAIN_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            url: configService.get<string>('redisUrl'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
