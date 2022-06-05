import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from '@nestjs/config';
import config from './config/config';

@Module({
  imports:[
    ConfigModule.forRoot({envFilePath: './env', load: [config]}),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: configService.get<string>('sourceEmailService'),
              auth: {
                user: configService.get<string>('sourceEmail'),
                pass: configService.get<string>('sourceEmailPassword'),
            },
        },
        defaults: {
          from: configService.get<string>('sourceEmailDefaultFrom')
        }
    }),
    inject: [ConfigService],
  })],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {
}
