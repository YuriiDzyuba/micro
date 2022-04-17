import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { EventPattern, Payload } from "@nestjs/microservices";
import { EventsEnum } from "./contracts/events/events.enum";
import { SafeUserType } from "./contracts/safeUser.type";

@Controller()
export class EmailController {
  constructor(private readonly appService: EmailService) {}

  @EventPattern(EventsEnum.userCreated)
  onUserCreated(@Payload() createdUser: SafeUserType) {
    return this.appService.onUserCreated(createdUser);
  }

  @EventPattern(EventsEnum.userRemoved)
  onUserRemoved(@Payload() createdUser: SafeUserType) {
    return this.appService.onUserRemoved(createdUser);
  }
}
