import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsEnum } from './types/events.enum';
import { CreatedUserWithActivationLinkType } from '../user.module/types/createdUserWithActivationLink.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EventsService {
  private logger = new Logger(EventsService.name);
  constructor(
    private configService: ConfigService,
    @Inject('JWT_SERVICE') private client: ClientProxy,
  ) {}
  async onUserCreateEventEmitter(
    createdUserWithActivationLink: CreatedUserWithActivationLinkType,
  ) {
    this.client.emit(EventsEnum.userCreated, createdUserWithActivationLink);
    this.logger.log(`${EventsEnum.userCreated} - event was emitted`);
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }
}
