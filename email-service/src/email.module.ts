import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { sourceEmailDefaultFrom, sourceEmail, sourceEmailPassword, sourceEmailService} from "./config/config";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports:[ MailerModule.forRoot({
    transport: {
      service: sourceEmailService,
      auth: {
        user: sourceEmail,
        pass: sourceEmailPassword,
      },
    },
    defaults: {
      from: sourceEmailDefaultFrom,
    },
  })],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {
}
