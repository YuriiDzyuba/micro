import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('findOneEvent')
  findOne(@Payload() id: number) {
    return this.eventsService.findOne(id);
  }
}
