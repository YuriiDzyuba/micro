import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { SafeUserType } from "./contracts/safeUser.type";
import { onNewUserLetterCreator } from "./emailLettersFactory/onNewUserLetterCreator";

@Injectable()
export class EmailService {
  constructor(
      private email: MailerService,
  ) {}

  async onUserCreated(createdUser: SafeUserType): Promise<any> {
    const email = new onNewUserLetterCreator(createdUser)
    await this.email.sendMail({...email})
  }

  async onUserRemoved(user): Promise<any> {
    const email = new onNewUserLetterCreator(user)
    await this.email.sendMail({...email})
  }
}
