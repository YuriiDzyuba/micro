import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EventService } from './event.service';

@Controller()
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @MessagePattern('findOneEvent')
  findOne(@Payload() id: number) {
    return this.eventsService.findOne(id);
  }
}
