import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {redisUrl} from "../config/config";

@Module({
  imports: [ClientsModule.register([
    {
      name: 'JWT_SERVICE',
      transport: Transport.REDIS,
      options: {
        url: redisUrl,
      }
    },
  ]),],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
