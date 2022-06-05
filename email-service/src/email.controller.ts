import {Controller, Logger} from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from "@nestjs/microservices";
import { EventsEnum } from "./types/events.enum";
import { OnUserCreateValuesType } from "./types/onUserCreateValues.type";

@Controller()
export class EmailController {
  private readonly logger = new Logger()
  constructor(private readonly appService: EmailService) {}

  @EventPattern(EventsEnum.userCreated)
  onUserCreated(@Payload() values: OnUserCreateValuesType) {
    console.log("get event")
    return this.appService.onUserCreated(values);
  }

  @EventPattern(EventsEnum.userRemoved)
  onUserRemoved(@Payload() createdUser: OnUserCreateValuesType) {
    return this.appService.onUserRemoved(createdUser);
  }
}
