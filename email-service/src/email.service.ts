import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";
import { OnUserCreateValuesType } from "./types/onUserCreateValues.type";
import { onUserCreateTemplate } from "./templates/onUserCreate.template";

@Injectable()
export class EmailService {
  constructor(
      private email: MailerService,
  ) {}

  async onUserCreated(values: OnUserCreateValuesType): Promise<any> {
    console.log(values)
    const email = new onUserCreateTemplate(values)
    await this.email.sendMail(email.getLetter())
  }

  async onUserRemoved(user): Promise<any> {
    const email = new onUserCreateTemplate(user)
    await this.email.sendMail({...email})
  }
}
