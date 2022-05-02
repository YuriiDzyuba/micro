import { Inject, Injectable, Logger } from '@nestjs/common';
import { SafeUserType } from '../contracts/shared/safeUser.type';
import { ClientProxy } from '@nestjs/microservices';
import { EventsEnum } from '../contracts/events/events.enum';

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
