import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsEnum } from './types/events.enum';

@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);
  constructor(@Inject('MAIN_SERVICE') private client: ClientProxy) {}

  async onAvatarUpdateEventEmitter() {
    this.client.emit(EventsEnum.avatarUpdate, 'hello');
    this.logger.log(`${EventsEnum.avatarUpdate} - event was emitted`);
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }
}
