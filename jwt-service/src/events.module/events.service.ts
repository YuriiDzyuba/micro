import { Inject, Injectable, Logger } from '@nestjs/common';
import { SafeUserType } from '../user.module/types/safeUser.type';
import { ClientProxy } from '@nestjs/microservices';
import { EventsEnum } from './types/events.enum';

@Injectable()
export class EventsService {
  private logger = new Logger(EventsService.name);
  constructor(@Inject('JWT_SERVICE') private client: ClientProxy) {}

  async onUserCreateEventEmitter(createdUser: SafeUserType) {
    this.client.emit(EventsEnum.userCreated, createdUser);
    this.logger.log(`${EventsEnum.userCreated} - event was emitted`);
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }
}
