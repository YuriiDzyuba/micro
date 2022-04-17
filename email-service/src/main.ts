import { NestFactory, Reflector } from '@nestjs/core';
import { EmailModule } from './email.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { redisUrl } from "./config/config";
import { Logger } from '@nestjs/common';

const logger = new Logger('EMAIL-SERVICE');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(EmailModule, {
    transport: Transport.REDIS,
    options: {
      url: redisUrl,
    },
  });

  await app.listen();
  logger.log(`listening ${redisUrl}`)
}
bootstrap();